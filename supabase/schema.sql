-- =========================================================================
-- Supabase Schema for Professional Sales & Inventory Analytics
-- Derived accurately from Professional_Sales_Inventory_Analyst.xlsx
-- =========================================================================

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    customer_id VARCHAR(10) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    unit_cost NUMERIC(10, 2) NOT NULL CHECK (unit_cost >= 0),
    selling_price NUMERIC(10, 2) NOT NULL CHECK (selling_price >= 0),
    current_stock INTEGER NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Sales Transactions Table
CREATE TABLE IF NOT EXISTS public.sales (
    order_id VARCHAR(20) PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id VARCHAR(10) REFERENCES public.customers(customer_id) ON UPDATE CASCADE ON DELETE RESTRICT,
    product_id VARCHAR(10) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    unit_cost NUMERIC(10, 2) NOT NULL CHECK (unit_cost >= 0),
    discount_pct NUMERIC(5, 2) DEFAULT 0.0 CHECK (discount_pct >= 0 AND discount_pct <= 100),
    sales_revenue NUMERIC(12, 2) NOT NULL,
    cogs NUMERIC(12, 2) NOT NULL,
    gross_profit NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    order_status VARCHAR(20) NOT NULL DEFAULT 'Completed',
    channel VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for analytical query acceleration
CREATE INDEX IF NOT EXISTS idx_sales_order_date ON public.sales(order_date);
CREATE INDEX IF NOT EXISTS idx_sales_product_id ON public.sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_customer_id ON public.sales(customer_id);
CREATE INDEX IF NOT EXISTS idx_sales_channel ON public.sales(channel);
CREATE INDEX IF NOT EXISTS idx_sales_status ON public.sales(order_status);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Read-only Public Access Policies (for anonymous dashboard viewing)
CREATE POLICY "Allow public read-only access on customers"
    ON public.customers FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read-only access on products"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read-only access on sales"
    ON public.sales FOR SELECT
    TO anon, authenticated
    USING (true);

-- =========================================================================
-- Analytical Views (matching Excel calculations)
-- =========================================================================

-- View: Monthly Sales Summary
CREATE OR REPLACE VIEW public.vw_monthly_analysis AS
SELECT 
    TO_CHAR(order_date, 'Mon YYYY') AS month_label,
    DATE_TRUNC('month', order_date) AS month_date,
    SUM(sales_revenue) AS total_revenue,
    SUM(cogs) AS total_cogs,
    SUM(gross_profit) AS total_gross_profit,
    ROUND((SUM(gross_profit) / NULLIF(SUM(sales_revenue), 0) * 100), 2) AS margin_pct,
    COUNT(order_id) AS total_orders,
    SUM(quantity) AS units_sold,
    ROUND(SUM(sales_revenue) / NULLIF(COUNT(order_id), 0), 2) AS avg_order_value
FROM public.sales
WHERE order_status = 'Completed'
GROUP BY DATE_TRUNC('month', order_date), TO_CHAR(order_date, 'Mon YYYY')
ORDER BY month_date ASC;

-- View: Inventory Risk & Velocity
CREATE OR REPLACE VIEW public.vw_inventory_analysis AS
SELECT 
    p.product_id,
    p.product_name,
    p.category,
    p.current_stock,
    p.unit_cost,
    (p.current_stock * p.unit_cost) AS stock_value,
    COALESCE(SUM(s.quantity), 0) AS total_units_sold,
    ROUND(COALESCE(SUM(s.quantity), 0)::NUMERIC / 9.0, 2) AS avg_monthly_sales,
    ROUND(
        CASE 
            WHEN COALESCE(SUM(s.quantity), 0) > 0 
            THEN p.current_stock / (COALESCE(SUM(s.quantity), 0)::NUMERIC / 9.0)
            ELSE 0 
        END, 2
    ) AS est_months_cover,
    CASE 
        WHEN p.current_stock <= 10 THEN 'REORDER NOW'
        WHEN (p.current_stock / NULLIF(COALESCE(SUM(s.quantity), 0)::NUMERIC / 9.0, 0)) < 1.0 THEN 'REORDER'
        ELSE 'OK'
    END AS risk_status
FROM public.products p
LEFT JOIN public.sales s ON p.product_id = s.product_id AND s.order_status = 'Completed'
GROUP BY p.product_id, p.product_name, p.category, p.current_stock, p.unit_cost;
