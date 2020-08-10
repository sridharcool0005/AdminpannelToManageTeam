-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 07, 2020 at 07:32 PM
-- Server version: 10.2.32-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutantek_smsportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `system_template_types`
--

CREATE TABLE `system_template_types` (
  `event_code` varchar(15) NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `image_filename` varchar(100) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `system_template_types`
--

INSERT INTO `system_template_types` (`event_code`, `display_name`, `image_filename`, `created_on`) VALUES
('DIWALI', 'Diwali', 'Diwali.png', '2020-04-30 08:35:06'),
('VINAYAKA', 'Vinayaka Chaturthi', 'Ganesh-Chaturthi.png', '2020-04-30 08:36:25'),
('PONGAL', 'Pongal', 'Pongal.png', '2020-04-30 08:37:31'),
('SANKRANTHI', 'Makar Sankranthi', 'Makar-Sankranti.png', '2020-04-30 08:39:06'),
('NEWYEAR', 'New Year', 'New-Year.png', '2020-04-30 08:40:16'),
('JANMASHTAMI', 'Sri Krishna Janmashtami', 'Janmashtami.png', '2020-04-30 08:41:55'),
('SHIVARATRI', 'Maha Shivaratri', 'Maha-Shivaratri.png', '2020-04-30 08:42:59'),
('LOHRI', 'Lohri', 'Lohri.png', '2020-04-30 08:43:30'),
('MUHARRAM', 'Muharram', 'Muharram.png', '2020-04-30 08:46:05'),
('GANDHIJAYANTI', 'Gandhi Jayanti', 'Mahatma-Gandhi-Jayanti.png', '2020-04-30 08:46:18'),
('RAMANAVAMI', 'Ramanavami', 'Rama-Navami.png', '2020-04-30 08:47:40'),
('DUSSEHRA', 'Dussehra', 'Dussehra.png', '2020-04-30 08:48:51'),
('PROMOTIONS', 'Business Promotions', 'Business-Promotion-192.png', '2020-07-07 09:59:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `system_template_types`
--
ALTER TABLE `system_template_types`
  ADD PRIMARY KEY (`event_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
