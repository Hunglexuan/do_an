import { Report } from "../models/core";

export const ERROR_MESSAGE = {
    LOGIN: {
        ERR_ACC: 'Tài khoản không tồn tại!',
        ERR_PASS: 'Mật khẩu không đúng',
        ERR_STATUS: 'Tài khoản không được phép đăng nhập',
        ERR_REQUIRE_EMAIL: 'Vui lòng cung cấp thông tin email',
        ERR_REQUIRE_PASSWORD: 'Vui lòng cung cấp mật khẩu',
        ERR_REQUIRE_ID: 'Vui lòng cung cấp ID'
        
    },
    ADD_USER_DISTRIBUTOR: {
        ERR_EXIST: 'Tài khoản đã tồn tại',
        ERR_DISTRIBUTOR_PARENT: 'Tài khoản cấp trên không hợp lệ',
        ERR_REQUIRE: 'Vui lòng cung cấp đủ thông tin đại lý',
        INVALID_KEY: 'Không đủ key để tạo đại lý',
        ERR_NAME: 'Please enter name!',
        ERR_EMAIL: 'Please enter email!',
        ERR_PHONE: 'Please enter phone!',
        ERR_PASS: 'Please enter password!',
        ERR_EXISTT: 'Account already exists!',
        ERR_ADDRESS: 'Address error',
        ERR_DOB: 'DOB error',

    },
    Customer: {
        ERR_NAME: 'Please enter your name!',
        ERR_COMPANY: 'Please enter your company name!',
        ERR_EMAIL: 'Please enter your email!',
        ERR_PHONE: 'Please enter your phone!',
        ERR_DES: 'Please enter your require!',
        ERR_PHONE_LENGTH: 'Phone Number Too Long!',
    },


    UPDATE_PASSWORD: {
        ERR_OLD_PASS: 'Mật khẩu cũ không đúng'
    },


    FORGOT_PASSWORD: {
        EMAIL_NOT_EXIST: 'Email không tồn tại'
    },
    ROLE: {
        ROLE_NOT_EXIST: 'Role khong ton tai'
    },
    REPORT: {
        REPORT_TYPE_NOT_EXIST: 'Report type khong ton tai',
        REPORT_USER_ID: 'Report user id khong ton tai',
        REPORT_CONTENT_NOT_EXIST: 'Report content khong ton tai',
        REPORT_SHOP_ID: 'Report shop id khong ton tai',
        REPORT_SHOP_ID_or_USER_ID: 'Report shop id hoac user id khong ton tai',
    },
    BILL: {
        BILL_NOT_EXIST: 'Bill khong ton tai',
        BILL_QUANTITY: 'Quantiy khong ton tai',
        BILL_TOTAL_PRICE: 'Total price khong ton tai',
        BILL_VOUCHER_ID: 'Bill voucher khong ton tai',
        BILL_PRODUCT_ID: 'Bill product id khong ton tai',
        BILL_STATUS: 'Bill status khong ton tai',
        
    },
    BILL_PRODUCT: {
        BILL_PRODUCT_NOT_EXIST: 'Bill product khong ton tai',
        BILL_PRODUCT_QUANTITY: 'Bill product quantiy khong ton tai',
        BILL_PRODUCT_TOTAL_PRICE: 'Bill product total price khong ton tai',
        BILL_PRODUCT_UNIT_PRICE: 'Bill unit price khong ton tai',
        BILL_PRODUCT_ID: 'Bill product id khong ton tai',
    },
    COMMENT :{
        COMMENT_NOT_EXIST: 'Comment khong ton tai',
        COMMENT_USER_ID:'Comment user id khong ton tai',
        COMMNET_PRODUCT_ID:'Comment product id khong ton tai',
        COMMENT_CONTENT:'Comment content khong ton tai',
    },
    FEEDBACK : {
        FEEDBACK_NOT_EXIST: 'Feedback khong ton tai',
        FEEDBACK_USER_ID: 'Feedback user id khong ton tai',
        FEEDBACK_SHOP_ID: 'Feedback shop id khong ton tai',
        FEEDBACK_CONTENT: 'Feedback content khong ton tai',
        FEEDBACK_RATE: 'Feedback rate khong ton tai',
    },
    IMAGE: {
        IMAGE_NOT_EXIST: 'Image khong ton tai',
        IMAGE_PRODUCT_ID: 'Image product id khong ton tai',
        IMAGE_LINK: 'Image link khong ton tai',
    },
    PRODUCT: {
        PRODUCT_NOT_EXIST: 'Product khong ton tai',
        PRODUCT_NAME: 'Product name khong ton tai',
        PRODUCT_QUANTITY: 'Product quantity khong ton tai',
        PRODUCT_UNIT_PRICE: 'Product unit price khong ton tai',
        PRODUCT_DESCRIPTION: 'Product description khong ton tai',
        PRODUCT_USER_ID: 'Product user id khong ton tai',
        PRODUCT_SALE: 'Product sale khong ton tai',
        PRODUCT_SALE_FROM: 'Product sale from khong ton tai',
        PRODUCT_SALE_TO: 'Prodcut sale to khong ton tai',
    },
    VOUCHER: {
        VOUCHER_NOT_EXIST: 'Voucher khong ton tai',
        VOUCHER_CODE: 'Voucher code khong ton tai',
        VOUCHER_DISCOUNT_NUMBER: 'Voucher discount number khong ton tai',
    },
    Bill_TEMP: {
        BILL_TEMP_NOT_EXIST: 'Bill temp khong ton tai',
        BILL_TEMP_BILL_ID : 'Bill temp bill id khong ton tai',
        BILL_TEMP_BILL_PRODUCT_ID: 'Bill temp  bill product id khong ton tai',
    },

}