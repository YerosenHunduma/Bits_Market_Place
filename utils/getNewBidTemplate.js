export const getNewBidEmailTemplate = (sellerName, productName, bidAmount, bidderName) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Bid Notification</title>
    <style>
        body {
            font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
            background-color: #f2f4f6;
            color: #51545e;
        }
        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #f2f4f6;
        }
        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
        }
        .email-masthead {
            padding: 25px 0;
            text-align: center;
            background-color: #515D6A;
            color: #ffffff;
        }
        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
        }
        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 45px;
            background-color: #ffffff;
        }
        .bid-details {
            font-size: 16px;
            font-weight: bold;
            color: #22bc66;
        }
        .email-footer {
            text-align: center;
            padding: 20px;
            background-color: #f2f4f6;
            color: #6b6e76;
        }
    </style>
</head>
<body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="email-masthead">
                            <h1>New Bid on Your Product</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-cell">
                                        <h2>Hi ${sellerName},</h2>
                                        <p>You have received a new bid on your product:</p>
                                        <p><strong>Product:</strong> ${productName}</p>
                                        <p><strong>Bidder:</strong> ${bidderName}</p>
                                        <p class="bid-details"><strong>Bid Amount:</strong> $${bidAmount}</p>
                                        <p>Please review the bid and take appropriate action by visiting your dashboard.</p>
                                        <p>Thank you for using our marketplace!</p>
                                        <p>Best regards, <br>The Bits Shop Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-footer">
                            <p>&copy; 2024 Bits Shop</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
