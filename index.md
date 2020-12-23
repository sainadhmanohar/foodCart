
<head>
    <title>Food App</title>
    <link href="foodCart.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="foodItemsContainer" id="fdContainer">
        </div>
        <div class="checkoutFooter">
            <div id="cartHeader" class="cartHeaderClose">
                <p style="display: inline-block;">Your Order (<span id="ordersCount">0</span>)</p>
                <button class="btn" id="closeCart">Close</button>
                <div class="totalAmount">
                    <span>Total Amount : </span>
                    <span id="totalAmtTextContent">$0</span>
                </div>
                <button class="btn" id="cartBtn">Takeme To Cart</button>
            </div>
            <div class="ordercartList"></div>
        </div>
    </div>
    <script src="foodCart.js"></script>
</body>
