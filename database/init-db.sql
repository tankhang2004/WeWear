CREATE DATABASE WeWear;
USE WeWear;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    base_price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
);

CREATE TABLE ProductVariants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    size VARCHAR(10),
    color VARCHAR(50),
    price NUMERIC(10,2),
    stock_quantity INT,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE CartItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_variant_id INT,
    quantity INT,
    price_at_addition NUMERIC(10,2),
    FOREIGN KEY (cart_id) REFERENCES Cart(id),
    FOREIGN KEY (product_variant_id) REFERENCES ProductVariants(id)
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    customer_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10,2),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_variant_id INT,
    quantity INT,
    price_at_purchase NUMERIC(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_variant_id) REFERENCES ProductVariants(id)
);

-- Insert admin user
INSERT INTO Users (username, email, password_hash, role)
VALUES 
('admin', 'admin@example.com', 'hashed_password_here', 'admin');

-- Insert brand
INSERT INTO Brands (name, description, logo_url)
VALUES 
('StylishCo', 'Trendy fashion brand', 'https://example.com/logo.png');

-- Insert products
INSERT INTO Products (brand_id, name, description, category, base_price)
VALUES 
(1, 'Classic T-Shirt', 'A timeless classic cotton t-shirt.', 'Shirt', 15.00),
(1, 'Denim Jacket', 'Stylish and warm denim jacket.', 'Jacket', 45.00),
(1, 'Sneakers', 'Comfortable everyday sneakers.', 'Shoes', 60.00);

-- Insert product variants
-- T-Shirt Variants
INSERT INTO ProductVariants (product_id, size, color, price, stock_quantity)
VALUES 
(1, 'M', 'White', 15.00, 50),
(1, 'L', 'Black', 15.00, 30);

-- Jacket Variants
INSERT INTO ProductVariants (product_id, size, color, price, stock_quantity)
VALUES 
(2, 'M', 'Blue', 45.00, 20),
(2, 'L', 'Dark Blue', 45.00, 15);

-- Sneakers Variants
INSERT INTO ProductVariants (product_id, size, color, price, stock_quantity)
VALUES 
(3, '42', 'White', 60.00, 25),
(3, '43', 'Black', 60.00, 18);
