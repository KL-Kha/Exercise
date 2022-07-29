PORT
 - api: 46789
 - ui: 3000

-- Link video demo: https://youtu.be/NbkMnImjbeo

----------- ĐỒ ÁN CUỐI KỲ: MÔN LẬP TRÌNH WEB NÂNG CAO NHÓM 13 - HK2 -----------

-- Thông tin thành viên nhóm -- 
1. 51900690 - Hồ Ngọc Thanh
2. 51900683 - Nguyễn Đại Hiệp
3. 51900033 - Trấn Quốc Đạt
4. 51900712 - Trương Tuấn Thịnh
5. 51900718 - Tăng Kiến Trung
-------------------------------

Các bước chạy Project API:
	Dùng MySQL trong XAMPP
Bước 1: Mở XAMPP để Start dịch vụ Apache và MySQL.
Bước 2: Mở PHPMyAdmin và import cơ sở dữ liệu vào hệ quản trị cơ sở dữ liệu. (File 'database.sql')
Bước 3: Cài đặt 'yarn' thông qua câu lệnh npm install --global yarn.
Bước 4: Di chuyển cmd vào thư mục source/NodeJS và gõ lệnh 'yarn' để đảm bảo cài đặt các modules cần thiết.
Bước 5: Sau khi cài đặt hoàn tất gõ lệnh 'yarn start' để chạy server API với PORT 46789.
Bước 6: Quan sát màn hình cmd 'The solution is:  2  => Database connection is established' Nếu dòng này xuất hiện tức đã kết nối với cơ sở dữ liệu thành công.

	Dùng MySQL không từ XAMPP
Bước 1: Import cơ sở dữ liệu vào hệ quản trị cơ sở dữ liệu. (File 'database.sql')
Bước 2: Cài đặt 'yarn' thông qua câu lệnh npm install --global yarn.
Bước 3: Di chuyển cmd vào thư mục source/NodeJS và gõ lệnh 'yarn' để đảm bảo cài đặt các modules cần thiết.
Bước 4: Vào file .env để thiết lập các thông số kết nối với MySQL phù hợp với cài đặt MySQL hiện có.
Bước 5: Sau khi cài đặt hoàn tất gõ lệnh 'yarn start' để chạy server API với PORT 46789.
Bước 6: Quan sát màn hình cmd 'The solution is:  2  => Database connection is established' Nếu dòng này xuất hiện tức đã kết nối với cơ sở dữ liệu thành công.

Các bước chạy Project React:
Bước 1: Di chuyển cmd vào thư mục source/ReactJS và gõ lệnh 'yarn build' để đảm bảo cài đặt các modules cần thiết.
Bước 2: Sau khi cài đặt hoàn tất gõ lệnh 'serve -s build' để chạy project.

---------------------------------------------------------------------------------------------------------------------------
Ghi chú:

Liên quan đến config gửi mail:
Các thông tin liên quan đến gửi mail có thể được thay đổi trong file .env trong thư mục /source/NodeJS.
Và file 'send-mail-util.js' trong thư mục /source/NodeJS/src/utils.

Liên quan đến kết nối cơ sở dữ liệu:
Các thông tin liên quan đến gửi mail có thể được thay đổi trong file .env trong thư mục /source/NodeJS.
Và file 'database.js' trong thư mục /source/NodeJS/src/configs.


---------------------------------------------------------------------------------------------------------------------------
Một số tài khoản mẫu
Admin account:
Username: 0000000001 
Password: 123456

User account:
1. Chưa đổi mật khẩu lần đầu
Username: 0000000002
Password: vQh3Ml

2. Đã đổi mật khẩu lần đầu - Chưa xác minh
Username: 0000000003
Password: 123456

3. Tài khoản bị khóa do đăng nhập sai quá nhiều
Username: 0000000004
Password: eG5KvP

4. Tài khoản đã đổi mật khẩu lần đầu - Đã xác minh
Username: 0000000005
Password: 123456

5. Tài khoản đã đổi mật khẩu lần đầu - Chờ cập nhật
Username: 0000000006
Password: 123456