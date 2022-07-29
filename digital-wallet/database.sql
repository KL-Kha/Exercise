-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2022 at 05:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digital_wallet`
--
CREATE DATABASE IF NOT EXISTS `digital_wallet` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `digital_wallet`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `username` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mật khẩu chỉ chứa tối đa 6 ký tự nhưng sử dụng VARCHAR(255) để chứa mật khẩu sau khi Hash',
  `refresh_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Refresh Token để lấy lại access token đã hết hạn',
  `state` tinyint(1) DEFAULT 0 COMMENT 'Trạng thái của tài khoản:\r\n0 : "Chờ xác minh"\r\n1: "Đã xác minh"\r\n2: "Đã vô hiệu hóa"\r\n3: "Chờ cập nhật"',
  `login_failed_attempt` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Đếm số lần nhập sai mật khẩu ! Nếu quá số lần quy định thì khóa tài khoản. Nếu = 3 thì ghi nhận 1 lần "Đăng nhập bất thường" và cập nhật last_login_attempt = Now, Nếu bằng 6 => Khóa tài khoản vô thời hạn.',
  `last_lock_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian đăng nhập sai , Nếu đăng nhập sai 3 lần thì cập nhật fields này = Now() => So với thời gian hiện tại nếu > 1 phút cho phép đăng nhập',
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: User OR 1: Admin',
  `is_changed_password` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Bắt buộc đổi mật khẩu lần đầu đăng nhập.\r\n0: Chưa đổi\r\n1: Đã đổi',
  `is_banned` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 : Không khóa tài khoản\r\n1 : Khóa tài khoản',
  `created_date` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian tạo tài khoản',
  `banned_date` datetime DEFAULT NULL COMMENT 'Thời gian tài khoản bị khóa (NULLABLE)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `username`, `password`, `refresh_token`, `state`, `login_failed_attempt`, `last_lock_time`, `role`, `is_changed_password`, `is_banned`, `created_date`, `banned_date`) VALUES
(1, '0000000001', '$2b$10$o/b.YmgagVvYpznLf81iheN2x7oJwAHclWpaiucjF797xCJ89P4E6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAwMDAwMDAwMDEiLCJyb2xlIjoxLCJzdGF0ZSI6MSwiaXNfY2hhbmdlZF9wYXNzd29yZCI6MSwiaXNfYmFubmVkIjowLCJpYXQiOjE2NTQwMDg3NzcsImV4cCI6MTY4NTU2NjM3N30.skXSuUPwM82CSamsfD8596BtpKVjMvaEsjsCUd87tZo', 1, 0, '2022-05-31 21:50:21', 1, 1, 0, '2022-05-31 21:50:21', NULL),
(2, '0000000002', '$2b$10$3h8tGOENTr0ziuTMbv3rie.gCTVsZ.SB5mUvZpWkjcRkkjGeUOd26', NULL, 0, 0, '2022-05-31 21:56:36', 0, 0, 0, '2022-05-31 21:56:36', NULL),
(3, '0000000003', '$2b$10$v8UWm3HuUlQtid0KDqiw6egXdoqQOh.6tLD/6uHuavJJPCtQbvCVG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAwMDAwMDAwMDMiLCJyb2xlIjowLCJzdGF0ZSI6MCwiaXNfY2hhbmdlZF9wYXNzd29yZCI6MSwiaXNfYmFubmVkIjowLCJpYXQiOjE2NTQwMDkwNjksImV4cCI6MTY4NTU2NjY2OX0.fEMtB37RI2U6rxPWvAum5djA6G18qlTRgnqyKzS0bgg', 0, 0, '2022-05-31 21:57:28', 0, 1, 0, '2022-05-31 21:57:28', NULL),
(4, '0000000004', '$2b$10$qyKSMIp0s4upkTZi0Zag8ud62SaB.dAaGi4G6jGETWmsFJMcmRM7i', NULL, 0, 6, '2022-05-31 22:00:23', 0, 0, 1, '2022-05-31 21:58:41', '2022-05-31 22:00:23'),
(5, '0000000005', '$2b$10$4KkcLg2m8MqIPlyAKiIChu..C8AShmEVjqhAu9d2TG5jfuIXMpF1G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAwMDAwMDAwMDUiLCJyb2xlIjowLCJzdGF0ZSI6MCwiaXNfY2hhbmdlZF9wYXNzd29yZCI6MSwiaXNfYmFubmVkIjowLCJpYXQiOjE2NTQwMDkyNTAsImV4cCI6MTY4NTU2Njg1MH0.NiPO91RNtbgrp6FODXZdSlbLGHQTHOq1fkbX7KMXYuc', 1, 0, '2022-05-31 22:00:16', 0, 1, 0, '2022-05-31 22:00:16', NULL),
(6, '0000000006', '$2b$10$Gk4aDN4fSvTKBTOdzpqMUeOtMj./dEBsDkza1QoZPQ.LoB4y56wT2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAwMDAwMDAwMDYiLCJyb2xlIjowLCJzdGF0ZSI6MCwiaXNfY2hhbmdlZF9wYXNzd29yZCI6MSwiaXNfYmFubmVkIjowLCJpYXQiOjE2NTQwMDkzODAsImV4cCI6MTY4NTU2Njk4MH0.AD3iDhDneG_2UMH8IgU_LWfHfNS18RKlDDbAJzJzBEc', 3, 0, '2022-05-31 22:02:33', 0, 1, 0, '2022-05-31 22:02:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `credit_card`
--

CREATE TABLE `credit_card` (
  `card_number` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Số thẻ tín dụng 6(chữ số)',
  `expiry_date` date NOT NULL COMMENT 'Ngày hết hạn thẻ',
  `cvv_code` varchar(3) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mã CVV 3 chữ số',
  `credit_card_balance` bigint(20) NOT NULL DEFAULT 0 COMMENT 'Số tiền thẻ tín dụng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `credit_card`
--

INSERT INTO `credit_card` (`card_number`, `expiry_date`, `cvv_code`, `credit_card_balance`) VALUES
('111111', '2022-10-10', '411', 0),
('222222', '2022-11-11', '443', 0),
('333333', '2022-12-12', '577', 0);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_network_operator`
--

CREATE TABLE `mobile_network_operator` (
  `id` int(11) NOT NULL,
  `network_operator_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `network_operator_code` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mobile_network_operator`
--

INSERT INTO `mobile_network_operator` (`id`, `network_operator_name`, `network_operator_code`) VALUES
(1, 'Viettel', '11111'),
(2, 'Mobifone', '22222'),
(3, 'Vinaphone', '33333');

-- --------------------------------------------------------

--
-- Table structure for table `phone_card`
--

CREATE TABLE `phone_card` (
  `phone_card_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mã thẻ cào',
  `phone_card_value` bigint(20) NOT NULL COMMENT 'Mệnh giá',
  `phone_card_tax` bigint(20) NOT NULL COMMENT 'Phí giao dịch'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `send_from` int(11) DEFAULT NULL COMMENT 'ID người gửi',
  `send_to` int(11) DEFAULT NULL COMMENT 'ID người nhận',
  `transaction_type` tinyint(1) DEFAULT NULL COMMENT 'Kiểu giao dịch:\r\n0: Nạp tiền\r\n1: Rút tiền\r\n2: Chuyển tiền\r\n3: Nhận tiền\r\n4: Thanh toán dịch vụ',
  `amount` bigint(20) NOT NULL,
  `transaction_time` datetime NOT NULL DEFAULT current_timestamp(),
  `transaction_state` tinyint(1) DEFAULT NULL COMMENT 'Trạng thái:\r\n0: Đã giao dịch thành công\r\n1: Chờ duyệt\r\n2: Bị hủy',
  `transaction_note` text COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Ghi chú giao dịch',
  `transaction_tax` double DEFAULT NULL COMMENT 'Phí giao dịch',
  `transaction_tax_pay_by` int(11) DEFAULT NULL COMMENT 'Tiền phí chuyển tiền được trả bởi người nhận hay người chuyển'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `day_of_birth` date NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `identity_card_front` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mặt trước CMND (Lưu đường dẫn tới ảnh)',
  `identity_card_back` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mặt sau CMND (Lưu đường dẫn tới ảnh)',
  `user_account_id` int(11) NOT NULL,
  `user_wallet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `phone_number`, `email`, `full_name`, `day_of_birth`, `address`, `identity_card_front`, `identity_card_back`, `user_account_id`, `user_wallet_id`) VALUES
(1, '0862972345', 'vudinhhong@tdtu.edu.vn', 'Vũ Đình Hồng', '1996-07-19', '20 Nguyễn Chí Thanh P.7 Q.11 TP.HCM', '4bb82433.jpg', '6db71c91.jpg', 1, 1),
(2, '0935144328', 'trungtkt159@gmail.com', 'Tăng Kiến Trung', '2001-11-19', '40/10 Lý Nam Đế P.7 Q.11 Hà Nội', '7099c044.jpg', '851e671d.jpg', 2, 2),
(3, '0442071791', 'nguyendaihiep@gmail.com', 'Nguyễn Đại Hiệp', '2001-01-06', '40/10 Lý Nam Đế P.7 Q.11 Hà Nội', '34ea6737.jpg', '650048a1.jpg', 3, 3),
(4, '0442071796', 'truongtuanthinh@gmail.com', 'Trương Tuấn Thịnh', '2001-01-01', '3 Trần Phú P.7 Q.11 Nhật Bản', '00ad915e.jpg', '123c9642.jpg', 4, 4),
(5, '0442071784', 'hongocthanh@gmail.com', 'Hồ Ngọc Thanh', '2000-08-05', '20 Phú Thọ Đống Đa Hà Nội', '7afa2655.jpg', '386bdd90.jpg', 5, 5),
(6, '0442071721', 'nguyenquocdat@gmail.com', 'Nguyễn Quốc Đạt', '2000-08-05', '20 Phú Thọ Đống Đa Hà Nội', '66f5e903.jpg', 'dd71e16b.jpg', 6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user_digital_wallet`
--

CREATE TABLE `user_digital_wallet` (
  `user_digital_wallet_id` int(11) NOT NULL,
  `balance` bigint(20) NOT NULL DEFAULT 0,
  `last_withdraw` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Dựa vào đây để kiểm tra nếu chưa qua 1 ngày mà rút tiền quá 2 lần thì hiện thông báo lỗi'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_digital_wallet`
--

INSERT INTO `user_digital_wallet` (`user_digital_wallet_id`, `balance`, `last_withdraw`) VALUES
(1, 0, '2022-05-31 21:50:21'),
(2, 0, '2022-05-31 21:56:36'),
(3, 0, '2022-05-31 21:57:28'),
(4, 0, '2022-05-31 21:58:41'),
(5, 0, '2022-05-31 22:00:16'),
(6, 0, '2022-05-31 22:02:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `user_id` int(11) NOT NULL,
  `otp` int(6) DEFAULT NULL,
  `data` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_otp`
--

INSERT INTO `user_otp` (`user_id`, `otp`, `data`, `created_at`) VALUES
(1, NULL, NULL, '0000-00-00 00:00:00'),
(2, NULL, NULL, '0000-00-00 00:00:00'),
(5, NULL, NULL, '0000-00-00 00:00:00'),
(1, NULL, NULL, '2022-05-31 21:50:21'),
(2, NULL, NULL, '2022-05-31 21:56:37'),
(3, NULL, NULL, '2022-05-31 21:57:28'),
(4, NULL, NULL, '2022-05-31 21:58:41'),
(5, NULL, NULL, '2022-05-31 22:00:17'),
(6, NULL, NULL, '2022-05-31 22:02:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `credit_card`
--
ALTER TABLE `credit_card`
  ADD PRIMARY KEY (`card_number`);

--
-- Indexes for table `mobile_network_operator`
--
ALTER TABLE `mobile_network_operator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `network_operator_name` (`network_operator_name`),
  ADD UNIQUE KEY `network_operator_code` (`network_operator_code`);

--
-- Indexes for table `phone_card`
--
ALTER TABLE `phone_card`
  ADD PRIMARY KEY (`phone_card_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `FK_TRANSACTION_FROM_USER` (`send_from`),
  ADD KEY `FK_TRANSACTION_TO_USER` (`send_to`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_account_id` (`user_account_id`),
  ADD UNIQUE KEY `user_wallet_id` (`user_wallet_id`);

--
-- Indexes for table `user_digital_wallet`
--
ALTER TABLE `user_digital_wallet`
  ADD PRIMARY KEY (`user_digital_wallet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mobile_network_operator`
--
ALTER TABLE `mobile_network_operator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_digital_wallet`
--
ALTER TABLE `user_digital_wallet`
  MODIFY `user_digital_wallet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_TRANSACTION_FROM_USER` FOREIGN KEY (`send_from`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TRANSACTION_TO_USER` FOREIGN KEY (`send_to`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_User_Account` FOREIGN KEY (`user_account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_User_UserDigitalWallet` FOREIGN KEY (`user_wallet_id`) REFERENCES `user_digital_wallet` (`user_digital_wallet_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
