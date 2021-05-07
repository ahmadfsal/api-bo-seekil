-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 07, 2021 at 09:03 AM
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
(39, 'Ahmad Faisal', '89666438807', 'TEST', '2021-05-02 14:03:03', '2021-05-02 14:03:03'),
(40, 'Ahmad Faisal', '89666438807', 'TEST', '2021-05-02 14:04:05', '2021-05-02 14:04:05');

-- --------------------------------------------------------

--
-- Table structure for table `master_partnership`
--

CREATE TABLE `master_partnership` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `potongan` double NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_promo`
--

INSERT INTO `master_promo` (`id`, `name`, `code`, `discount`, `description`, `start_date`, `end_date`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Promo Member CISC Cirebon', 'SEECISCCRB', 20, 'Nikmati diskon 20% untuk setiap order di SEEKIL, khusus untuk member CISC Cirebon', '2021-05-02', '2021-09-02', 1, '2021-05-02 08:17:14', '2021-05-02 08:17:14');

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
(7, 'Whitening', '2-4', 50000, 'Memutihkan kembali Upper sepatu putih yang kotor', '2021-02-19 04:33:31', '2021-02-19 04:33:31'),
(8, 'Unyellowing', '3-5', 70000, 'Memutihkan kembali midsole yang menguning (khusus midsole rubber/karet)\nInclude Deep Cleaning', '2021-04-28 14:09:04', '2021-04-28 14:09:04'),
(9, 'For Them', '2-4', 25000, 'Treatment untuk sepatu anak dan sepatu wanita (Flatshoes, Heels, Wedges)', '2021-04-19 14:51:57', '2021-04-19 14:51:57'),
(10, 'Repaint Canvas/Mesh/Knit/Denim', '2-7', 100000, 'Cat bagian atas (upper) sepatu bahan kanvas\nInclude Deep Cleaning', '2021-04-28 14:08:16', '2021-04-28 14:08:16'),
(11, 'Repaint Leather', '2-7', 150000, 'Cat bagian atas (upper) sepatu bahan kulit\nInclude Deep Cleaning', '2021-04-28 14:08:46', '2021-04-28 14:08:46'),
(12, 'Touch Up', '2-3', 30000, 'Cat bagian kecil dari sepatu/apparel', '2021-02-19 04:34:18', '2021-02-19 04:34:18'),
(13, 'Repaint Midsole', '3-5', 60000, 'Cat midsole sepatu\nInclude Fast Cleaning', '2021-04-19 15:04:16', '2021-04-19 15:04:16'),
(15, 'Repaint Suede', '2-7', 125000, 'Cat bagian atas (upper) sepatu bahan Suede\nInclude Deep Cleaning', '2021-04-28 14:08:36', '2021-04-28 14:08:36'),
(16, 'Repell Protection	', '1', 30000, 'Melindungi sepatu dari kotoran, dengan spray khusus	', '2021-04-19 14:56:26', '2021-04-19 14:56:26'),
(18, 'One Day Service', '1', 5000, 'Layanan sehari jadi', '2021-04-19 14:55:56', '2021-04-19 14:55:56'),
(19, 'Leather Shoes', '1', 5000, 'Layanan tambahan treatment cleaning untuk sepatu kulit', '2021-04-19 14:56:20', '2021-04-19 14:56:20');

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
(4, 'Ready to Shipment', 'Siap dikirim ke alamat pelanggan', '2021-05-06 22:05:25', '2021-05-06 22:05:25'),
(5, 'Ready to Pickup', 'Siap diambil', '2021-04-29 13:31:41', '2021-04-29 08:44:18'),
(6, 'Cancel', 'Order telah dibatalkan', '2021-05-06 22:05:16', '2021-05-06 22:05:16'),
(7, 'Done', 'Cucian selesai', '2021-05-02 14:19:50', '2021-05-02 07:52:59');

-- --------------------------------------------------------

--
-- Table structure for table `master_topping`
--

CREATE TABLE `master_topping` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_topping`
--

INSERT INTO `master_topping` (`id`, `name`, `description`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'Repell Protection', 'Melindungi sepatu dari kotoran, dengan spray khusus', 30000, '2021-01-27 16:18:43', '2021-02-19 06:11:48'),
(2, 'Leather Polish & Wax', 'Poles sepatu kulit dengan conditioner dan wax khusus', 20000, '2021-01-27 16:18:43', '2021-02-19 06:12:06'),
(3, 'One Day Service', 'Layanan sehari jadi', 5000, '2021-02-19 06:12:35', '2021-02-19 06:12:35'),
(4, 'Leather Shoes', 'Biaya tambahan treatment cleaning untuk sepatu kulit', 5000, '2021-02-19 06:13:29', '2021-02-19 06:13:29');

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
  `order_date` datetime DEFAULT current_timestamp(),
  `customer_name` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(15) DEFAULT NULL,
  `pickup_address` varchar(255) DEFAULT NULL,
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

INSERT INTO `order` (`id`, `order_id`, `order_type_id`, `order_status_id`, `store_id`, `partnership_id`, `order_date`, `customer_name`, `whatsapp`, `pickup_address`, `qty`, `total`, `createdAt`, `updatedAt`, `promo_id`, `pickup_delivery_price`, `potongan`) VALUES
(19, 'SO210502ED85DD', 2, 1, NULL, NULL, '2021-05-02 14:03:03', 'Ahmad Faisal', '89666438807', 'TEST', 1, 40000, '2021-05-02 14:03:03', '2021-05-02 14:03:03', 1, NULL, 8000),
(20, 'SO210502E3A12B', 2, 6, NULL, NULL, '2021-05-02 14:04:05', 'Ahmad Faisal', '89666438807', 'TEST', 1, 25000, '2021-05-06 21:54:45', '2021-05-06 21:54:45', NULL, NULL, NULL);

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
(71, '75219e85-ae61-440f-8ede-4abcce815afb', 'SO210502ED85DD', 'asd', 40000, NULL, '2021-05-02 14:03:03', '2021-05-02 14:03:03'),
(72, '1b8f84a5-cfce-4e06-a67e-8c19d87ece90', 'SO210502E3A12B', 'asd', 25000, NULL, '2021-05-02 14:04:05', '2021-05-02 14:04:05');

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
(1330, '75219e85-ae61-440f-8ede-4abcce815afb', 2, '2021-05-02 14:03:03', '2021-05-02 14:03:03'),
(1331, '1b8f84a5-cfce-4e06-a67e-8c19d87ece90', 1, '2021-05-02 14:04:05', '2021-05-02 14:04:05');

-- --------------------------------------------------------

--
-- Table structure for table `order_tracker`
--

CREATE TABLE `order_tracker` (
  `id` int(11) NOT NULL,
  `order_id` varchar(15) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_tracker`
--

INSERT INTO `order_tracker` (`id`, `order_id`, `order_status_id`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'SO210502E3A12B', 2, '', '2021-05-06 12:59:51', '2021-05-06 12:59:51'),
(3, 'SO210502E3A12B', 3, '', '2021-05-06 13:02:25', '2021-05-06 13:02:25'),
(6, 'SO210502E3A12B', 7, '', '2021-05-06 21:35:19', '2021-05-06 21:35:19'),
(9, 'SO210502E3A12B', 1, '', '2021-05-06 21:51:39', '2021-05-06 21:51:39'),
(10, 'SO210502E3A12B', 4, '', '2021-05-06 21:52:23', '2021-05-06 21:52:23'),
(11, 'SO210502E3A12B', 5, '', '2021-05-06 21:52:48', '2021-05-06 21:52:48'),
(12, 'SO210502E3A12B', 6, '', '2021-05-06 21:54:45', '2021-05-06 21:54:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_partnership`
--
ALTER TABLE `master_partnership`
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
-- Indexes for table `master_topping`
--
ALTER TABLE `master_topping`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `master_partnership`
--
ALTER TABLE `master_partnership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_products`
--
ALTER TABLE `master_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_promo`
--
ALTER TABLE `master_promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_services`
--
ALTER TABLE `master_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `master_status`
--
ALTER TABLE `master_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `master_topping`
--
ALTER TABLE `master_topping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `master_type`
--
ALTER TABLE `master_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `order_item_services`
--
ALTER TABLE `order_item_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1332;

--
-- AUTO_INCREMENT for table `order_tracker`
--
ALTER TABLE `order_tracker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
