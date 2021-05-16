-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 16, 2021 at 11:56 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_seekil`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `whatsapp`, `address`, `createdAt`, `updatedAt`) VALUES
(17, 'Ittang', '082127051607', 'Cirebon', '2021-05-15 07:19:06', '2021-05-15 16:03:14'),
(18, 'doni', '89666438807', NULL, '2021-05-16 05:45:20', '2021-05-16 05:45:20'),
(19, 'Zidan', '085295590974', NULL, '2021-05-16 08:38:37', '2021-05-16 09:05:34');

-- --------------------------------------------------------

--
-- Table structure for table `customer_history`
--

CREATE TABLE `customer_history` (
  `id` int(11) NOT NULL,
  `customer_id` tinyint(4) DEFAULT NULL,
  `order_id` tinyint(4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `master_partnership`
--

CREATE TABLE `master_partnership` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `potongan` double DEFAULT NULL,
  `drop_zone` varchar(10) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_partnership`
--

INSERT INTO `master_partnership` (`id`, `name`, `whatsapp`, `address`, `potongan`, `drop_zone`, `start_date`, `end_date`, `createdAt`, `updatedAt`) VALUES
(1, 'CISC Cirebon', '083107707998', 'Jl. Pilang Raya No.48, Sukapura\nKec. Kejaksan\nKota Cirebon, 45122', 20, 'yes', '2021-05-02', '2021-09-02', '2021-05-14 13:53:09', '2021-05-15 04:26:58');

-- --------------------------------------------------------

--
-- Table structure for table `master_payment_method`
--

CREATE TABLE `master_payment_method` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_payment_method`
--

INSERT INTO `master_payment_method` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Cash', '2021-05-16 08:49:29', NULL),
(2, 'Transfer Bank [BCA - 7745426883 a/n Ahmad Faisal]', '2021-05-16 08:49:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_products`
--

CREATE TABLE `master_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `master_promo`
--

CREATE TABLE `master_promo` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_promo`
--

INSERT INTO `master_promo` (`id`, `name`, `code`, `discount`, `description`, `start_date`, `end_date`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Promo Member CISC Cirebon', 'SEECISCCRB', 20, 'Diskon 20% untuk setiap order di SEEKIL\nKhusus untuk member CISC Cirebon', '2021-05-02', '2021-09-02', 'active', '2021-05-16 09:41:02', '2021-05-15 16:10:34');

-- --------------------------------------------------------

--
-- Table structure for table `master_services`
--

CREATE TABLE `master_services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `estimate` varchar(15) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_services`
--

INSERT INTO `master_services` (`id`, `name`, `estimate`, `price`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Fast Cleaning', '1-2', 25000, 'Mencuci bagian luar sepatu (Outsole, Midsole, Upper)', '2021-02-19 04:29:46', '2021-02-19 04:29:46'),
(2, 'Deep Cleaning', '2-5', 40000, 'Cuci keseluruhan bagian sepatu (luar dan dalam)', '2021-04-28 14:07:45', '2021-04-28 14:07:45'),
(3, 'Whitening', '2-4', 50000, 'Memutihkan kembali Upper sepatu putih yang kotor', '2021-05-14 14:04:33', '2021-02-19 04:33:31'),
(4, 'Unyellowing', '3-5', 70000, 'Memutihkan kembali midsole yang menguning (khusus midsole rubber/karet)\nInclude Deep Cleaning', '2021-05-14 14:04:37', '2021-04-28 14:09:04'),
(5, 'For Them', '2-4', 25000, 'Treatment untuk sepatu anak dan sepatu wanita (Flatshoes, Heels, Wedges)', '2021-05-14 14:04:40', '2021-04-19 14:51:57'),
(6, 'Repaint Canvas/Mesh/Knit/Denim', '2-7', 100000, 'Cat bagian atas (upper) sepatu bahan kanvas\nInclude Deep Cleaning', '2021-05-14 14:04:42', '2021-04-28 14:08:16'),
(7, 'Repaint Leather', '2-7', 150000, 'Cat bagian atas (upper) sepatu bahan kulit\nInclude Deep Cleaning', '2021-05-14 14:04:45', '2021-04-28 14:08:46'),
(8, 'Touch Up', '2-3', 30000, 'Cat bagian kecil dari sepatu/apparel', '2021-05-14 14:04:49', '2021-02-19 04:34:18'),
(9, 'Repaint Midsole', '3-5', 60000, 'Cat midsole sepatu\nInclude Fast Cleaning', '2021-05-14 14:04:51', '2021-04-19 15:04:16'),
(10, 'Repaint Suede', '2-7', 125000, 'Cat bagian atas (upper) sepatu bahan Suede\nInclude Deep Cleaning', '2021-05-14 14:04:53', '2021-04-28 14:08:36'),
(11, 'Repell Protection	', '1', 30000, 'Melindungi sepatu dari kotoran, dengan spray khusus	', '2021-05-14 14:04:56', '2021-04-19 14:56:26'),
(12, 'One Day Service', '1', 5000, 'Layanan sehari jadi', '2021-05-14 14:04:59', '2021-04-19 14:55:56'),
(13, 'Leather Shoes', '1', 5000, 'Layanan tambahan treatment cleaning untuk sepatu kulit', '2021-05-14 14:05:02', '2021-04-19 14:56:20');

-- --------------------------------------------------------

--
-- Table structure for table `master_status`
--

CREATE TABLE `master_status` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_status`
--

INSERT INTO `master_status` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'New', 'Order baru masuk ke sistem', '2021-04-29 13:31:29', '2021-04-29 08:43:07'),
(2, 'Waiting List', 'Menunggu antrian untuk dicuci', '2021-04-29 13:31:33', '2021-04-29 08:43:19'),
(3, 'In Progress', 'Sedang dicuci', '2021-04-29 13:31:36', '2021-04-29 08:43:32'),
(4, 'Ready to Shipment', 'Siap dikirim ke alamat pemilik', '2021-05-14 08:40:34', '2021-05-14 08:40:34'),
(5, 'Ready to Pickup', 'Siap diambil', '2021-04-29 13:31:41', '2021-04-29 08:44:18'),
(6, 'Cancel', 'Order telah dibatalkan', '2021-05-06 22:05:16', '2021-05-06 22:05:16'),
(7, 'Done', 'Order selesai, item sudah diterima pemilik', '2021-05-14 08:40:27', '2021-05-14 08:40:27'),
(8, 'On Proggress Shipped', 'Sedang dikirim ke alamat pemilik', '2021-05-14 13:26:46', '2021-05-14 13:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `master_store`
--

CREATE TABLE `master_store` (
  `id` int(11) NOT NULL,
  `staging` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_store`
--

INSERT INTO `master_store` (`id`, `staging`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Jamblang', 'Blok Kavling Karanganyar, Desa Jamblang', '2021-05-16 07:13:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_type`
--

CREATE TABLE `master_type` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_type`
--

INSERT INTO `master_type` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'On Store', 'Datang langsung ke workshop', '2021-02-19 04:39:45', '2021-02-19 04:39:45'),
(2, 'Pickup & Delivery', 'Ambil dan antar ke tempat pelanggan', '2021-02-19 04:39:25', '2021-02-19 04:39:24'),
(3, 'Drop Off', 'Taruh di toko partnership', '2021-01-21 15:17:47', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `order_id` varchar(100) DEFAULT NULL,
  `order_type_id` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `partnership_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `customer_id` tinyint(4) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `promo_id` int(11) DEFAULT NULL,
  `pickup_delivery_price` double DEFAULT NULL,
  `potongan` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `order_id`, `order_type_id`, `order_status_id`, `store_id`, `partnership_id`, `payment_method_id`, `payment_status`, `order_date`, `customer_id`, `qty`, `total`, `createdAt`, `updatedAt`, `promo_id`, `pickup_delivery_price`, `potongan`) VALUES
(26, 'SO210515221JE0', 3, 1, NULL, 1, NULL, 'belum_lunas', '2021-05-15 07:19:06', 17, 1, 40000, '2021-05-16 09:36:04', '2021-05-15 07:20:38', 1, NULL, 8000),
(27, 'SO2105153GIF89', 3, 1, NULL, 1, NULL, 'belum_lunas', '2021-05-15 14:43:15', 17, 2, 57000, '2021-05-16 09:36:10', '2021-05-15 14:43:15', 1, NULL, 13000),
(28, 'SO2105154C7G62', 3, 1, NULL, 1, NULL, 'belum_lunas', '2021-05-15 14:55:59', 17, 3, 77000, '2021-05-16 09:36:14', '2021-05-15 14:55:59', 1, NULL, 18000),
(29, 'SO210515BH2A1G', 3, 1, NULL, 1, NULL, 'belum_lunas', '2021-05-15 14:57:49', 17, 4, 159000, '2021-05-16 09:36:20', '2021-05-15 14:57:49', 1, 7000, 38000),
(30, 'SO2105151JFFFJ', 2, 1, NULL, NULL, NULL, 'belum_lunas', '2021-05-15 16:03:14', 17, 1, 40000, '2021-05-16 09:36:24', '2021-05-15 16:03:14', NULL, NULL, NULL),
(31, 'SO2105169HF6FH', 3, 2, NULL, 1, NULL, 'belum_lunas', '2021-05-16 05:45:20', 18, 1, 45000, '2021-05-16 09:36:26', '2021-05-16 05:46:39', 1, 5000, 9000),
(32, 'SO210516D028BA', 1, 1, 1, NULL, NULL, 'belum_lunas', '2021-05-16 08:38:37', 19, 1, 20000, '2021-05-16 09:36:29', '2021-05-16 08:38:37', 1, NULL, 5000),
(33, 'SO210516G7HF0E', 1, 1, 1, NULL, 1, 'lunas', '2021-05-16 09:05:34', 19, 1, 25000, '2021-05-16 09:36:32', '2021-05-16 09:22:35', 1, NULL, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `item_id` varchar(100) DEFAULT NULL,
  `order_id` varchar(100) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `item_id`, `order_id`, `item_name`, `subtotal`, `note`, `createdAt`, `updatedAt`) VALUES
(27, '51188624-ce63-45bc-bfe8-cc2326823548', 'SO210515221JE0', 'Compass', 40000, 'BW, 41', '2021-05-15 07:19:06', '2021-05-15 07:19:06'),
(28, '830a5cc7-e14a-4a4c-90ae-e48709e514ee', 'SO2105153GIF89', 'test 1', 40000, NULL, '2021-05-15 14:43:15', '2021-05-15 14:43:15'),
(29, '4a88a668-a32a-4d71-a9f4-9f2de70f539a', 'SO2105153GIF89', 'test 2', 25000, NULL, '2021-05-15 14:43:15', '2021-05-15 14:43:15'),
(30, '52094e22-8d78-4ffb-84ca-85ea618cf2e4', 'SO2105154C7G62', 'aaa', 40000, 'aaa', '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(31, 'c3b63772-7d3a-4183-918d-8b74aa9a58f4', 'SO2105154C7G62', 'bbb', 25000, 'bbb', '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(32, '7b2a2db0-eb71-4321-8144-66482603079a', 'SO2105154C7G62', 'ccc', 25000, 'ccc', '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(33, '959da699-a985-4129-80ba-c9e547569d2c', 'SO210515BH2A1G', 'aaa', 40000, 'aaa', '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(34, '3c4bc2a5-765b-4c77-a05a-a1316f0cf498', 'SO210515BH2A1G', 'vvv', 25000, 'vvv', '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(35, '63c3280e-d320-44be-a0db-75d21687f965', 'SO210515BH2A1G', 'bbb', 25000, 'bbb', '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(36, '8823732d-31e8-4987-b8be-717048a187f0', 'SO210515BH2A1G', 'xxx', 100000, 'xxx', '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(37, 'b11c7360-74c3-4a54-84dd-82fe603d3027', 'SO2105151JFFFJ', 'ttr', 40000, 'rrrt', '2021-05-15 16:03:14', '2021-05-15 16:03:14'),
(38, '84cc31d0-cd75-4ca8-a421-a763a84640bd', 'SO2105169HF6FH', 'compass', 45000, 'black, 41', '2021-05-16 05:45:20', '2021-05-16 05:45:20'),
(39, 'f64f90a4-a781-48d7-8a8a-d8a86926a71c', 'SO210516D028BA', 'Adidas L.A Trainer', 25000, NULL, '2021-05-16 08:38:37', '2021-05-16 08:38:37'),
(40, '00afb24d-196d-4fca-a3ff-f18890255bf6', 'SO210516G7HF0E', 'Adidas L.A Trainer', 25000, NULL, '2021-05-16 09:05:34', '2021-05-16 09:05:34');

-- --------------------------------------------------------

--
-- Table structure for table `order_item_services`
--

CREATE TABLE `order_item_services` (
  `id` int(11) NOT NULL,
  `item_id` varchar(100) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_item_services`
--

INSERT INTO `order_item_services` (`id`, `item_id`, `service_id`, `createdAt`, `updatedAt`) VALUES
(28, '51188624-ce63-45bc-bfe8-cc2326823548', 2, '2021-05-15 07:19:06', '2021-05-15 07:19:06'),
(29, '830a5cc7-e14a-4a4c-90ae-e48709e514ee', 2, '2021-05-15 14:43:15', '2021-05-15 14:43:15'),
(30, '4a88a668-a32a-4d71-a9f4-9f2de70f539a', 1, '2021-05-15 14:43:15', '2021-05-15 14:43:15'),
(31, '52094e22-8d78-4ffb-84ca-85ea618cf2e4', 2, '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(32, 'c3b63772-7d3a-4183-918d-8b74aa9a58f4', 5, '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(33, '7b2a2db0-eb71-4321-8144-66482603079a', 5, '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(34, '959da699-a985-4129-80ba-c9e547569d2c', 2, '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(35, '3c4bc2a5-765b-4c77-a05a-a1316f0cf498', 1, '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(36, '63c3280e-d320-44be-a0db-75d21687f965', 5, '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(37, '8823732d-31e8-4987-b8be-717048a187f0', 6, '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(38, 'b11c7360-74c3-4a54-84dd-82fe603d3027', 2, '2021-05-15 16:03:14', '2021-05-15 16:03:14'),
(39, '84cc31d0-cd75-4ca8-a421-a763a84640bd', 2, '2021-05-16 05:45:20', '2021-05-16 05:45:20'),
(40, '84cc31d0-cd75-4ca8-a421-a763a84640bd', 12, '2021-05-16 05:45:20', '2021-05-16 05:45:20'),
(41, 'f64f90a4-a781-48d7-8a8a-d8a86926a71c', 1, '2021-05-16 08:38:37', '2021-05-16 08:38:37'),
(42, '00afb24d-196d-4fca-a3ff-f18890255bf6', 1, '2021-05-16 09:05:34', '2021-05-16 09:05:34');

-- --------------------------------------------------------

--
-- Table structure for table `order_tracker`
--

CREATE TABLE `order_tracker` (
  `id` int(11) NOT NULL,
  `order_id` varchar(15) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_tracker`
--

INSERT INTO `order_tracker` (`id`, `order_id`, `order_status_id`, `createdAt`, `updatedAt`) VALUES
(39, 'SO210515221JE0', 1, '2021-05-15 07:19:06', '2021-05-15 07:19:06'),
(40, 'SO210515221JE0', 1, '2021-05-15 07:20:38', '2021-05-15 07:20:38'),
(41, 'SO2105153GIF89', 1, '2021-05-15 14:43:15', '2021-05-15 14:43:15'),
(42, 'SO2105154C7G62', 1, '2021-05-15 14:55:59', '2021-05-15 14:55:59'),
(43, 'SO210515BH2A1G', 1, '2021-05-15 14:57:49', '2021-05-15 14:57:49'),
(44, 'SO2105151JFFFJ', 1, '2021-05-15 16:03:14', '2021-05-15 16:03:14'),
(45, 'SO2105169HF6FH', 1, '2021-05-16 05:45:20', '2021-05-16 05:45:20'),
(46, 'SO2105169HF6FH', 2, '2021-05-16 05:46:39', '2021-05-16 05:46:39'),
(47, 'SO210516D028BA', 1, '2021-05-16 08:38:37', '2021-05-16 08:38:37'),
(48, 'SO210516G7HF0E', 1, '2021-05-16 09:05:34', '2021-05-16 09:05:34'),
(49, 'SO210516G7HF0E', 1, '2021-05-16 09:20:10', '2021-05-16 09:20:10'),
(50, 'SO210516G7HF0E', 1, '2021-05-16 09:20:33', '2021-05-16 09:20:33'),
(51, 'SO210516G7HF0E', 1, '2021-05-16 09:21:47', '2021-05-16 09:21:47'),
(52, 'SO210516G7HF0E', 1, '2021-05-16 09:22:35', '2021-05-16 09:22:35');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `level`, `createdAt`, `updatedAt`) VALUES
(1, 'it.min', 'it.min', 'superadmin', '2021-05-14 07:04:20', '2021-05-14 07:04:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_history`
--
ALTER TABLE `customer_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_partnership`
--
ALTER TABLE `master_partnership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_payment_method`
--
ALTER TABLE `master_payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_products`
--
ALTER TABLE `master_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_promo`
--
ALTER TABLE `master_promo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_services`
--
ALTER TABLE `master_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_status`
--
ALTER TABLE `master_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_store`
--
ALTER TABLE `master_store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_type`
--
ALTER TABLE `master_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_item_services`
--
ALTER TABLE `order_item_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_tracker`
--
ALTER TABLE `order_tracker`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `customer_history`
--
ALTER TABLE `customer_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_partnership`
--
ALTER TABLE `master_partnership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_payment_method`
--
ALTER TABLE `master_payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_products`
--
ALTER TABLE `master_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_promo`
--
ALTER TABLE `master_promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_services`
--
ALTER TABLE `master_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `master_status`
--
ALTER TABLE `master_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `master_store`
--
ALTER TABLE `master_store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_type`
--
ALTER TABLE `master_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `order_item_services`
--
ALTER TABLE `order_item_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `order_tracker`
--
ALTER TABLE `order_tracker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
