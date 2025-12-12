CREATE DATABASE IF NOT EXISTS sanraw_db;
USE sanraw_db;

-- 1. User Table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Product Table
CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('paddy', 'fertilizer', 'equipment') NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inventory Purchase Table
CREATE TABLE IF NOT EXISTS inventory_purchase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    buy_price DECIMAL(10, 2) NOT NULL,
    payment_type ENUM('cash', 'cheque') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- 4. Customer Credit Table (Must be created before sale to be referenced if needed, typically independent but related logic)
CREATE TABLE IF NOT EXISTS customer_credit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_nic VARCHAR(20) UNIQUE NOT NULL,
    total_credit DECIMAL(10, 2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Sale Table
CREATE TABLE IF NOT EXISTS sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_type ENUM('cash', 'credit') NOT NULL,
    customer_nic VARCHAR(20) NULL,
    user_id INT NOT NULL, -- employee who made the sale
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 6. Credit Payment Table
CREATE TABLE IF NOT EXISTS credit_payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_nic VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_nic) REFERENCES customer_credit(customer_nic) ON DELETE CASCADE
);
