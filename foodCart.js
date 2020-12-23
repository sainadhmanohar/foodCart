// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json', {
//     method: 'GET',
//   })
//   .then(status)
//   .then(json)
//   .then(function(data) {
//     console.log('Request succeeded with JSON response', data);
//   }).catch(function(error) {
//     console.log('Request failed', error);
//   });

//   function status(response) {
//     if (response.statusCode >= 200 && response.statusCode < 300) {
//         console.log(response)
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(new Error(response.statusText))
//     }
//   }
  
//   function json(response) {
//     return response.json();
//   }

var itemOrder;
var orderItemsListObj=[];
var filteredObj = [];
var copy = 0;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
      var res = JSON.parse(this.response);
      res.forEach((ele,index) => {
        //console.log(ele);
        document.getElementsByClassName("foodItemsContainer")[0].innerHTML += `
        <div class="foodItems" data-fooditem="foodItems_`+ele.id+`">
            <div class="`+ele.id+`_foodItems">
                <img id="foodImg_`+ele.id+`" src="`+ele.image+`" alt="foodImg" />
                <br>
                <div class="details_foodItems"> 
                    <button class="orderFoodBtn" id="orderItem_`+ele.id+`" data-orderitem=`+ele.name+`>Add To Cart</button>
                    <span class="foodName" id="foodName_`+ele.id+`">`+ele.name+`</span>
                    </br>
                    <br>
                    <span class="foodPrice" id="foodPrice_`+ele.id+`" >$`+ele.price+`</span>
                    <br>
                    <button class="moreBtn" id="moreItem_`+ele.id+`">More</button>
                    <div class="descriptionItem" id="foodDescription_`+ele.id+`" style="display: none;">
                      <span style="font-weight: 700;margin-bottom:5px;">Description:</span><br/><p>`
                      +ele.description+
                    `</p></div>
                </div>
            </div>
        </div>`
      });
      var foodItem = document.getElementsByClassName("foodItemsContainer")[0];
      foodItem.addEventListener("click",function(event){
        console.log(event.target.id,event.target.className);
        if(event.target.className == "moreBtn"){
          console.log(document.getElementById("foodDescription_"+event.target.id.split("_")[1]));
          var desEle = document.getElementById("foodDescription_"+event.target.id.split("_")[1]);
          if(desEle.style.display == "none"){
            desEle.style.display = "block";
            document.getElementById("moreItem_"+event.target.id.split("_")[1]).innerText = "Less";
          }else{
            desEle.style.display = "none";
            document.getElementById("moreItem_"+event.target.id.split("_")[1]).innerText = "More";
          }
        }
        // if(event.target.className=="orderFoodBtn"){
        //   if(document.getElementById("orderItem_"+event.target.id.split("_")[1]).innerText == "Add To Cart"){
        //     document.getElementById("orderItem_"+event.target.id.split("_")[1]).innerHTML= "<span class='cartedItems' id='removeCartItem_"+event.target.id.split("_")[1]+"'>-</span>&nbsp&nbsp&nbsp&nbsp&nbsp<span class='addedCartItemCount' id='addedItems_"+event.target.id.split("_")[1]+"'>1</span>&nbsp&nbsp&nbsp&nbsp&nbsp<span class='cartedItems' id='addCartItem_"+event.target.id.split("_")[1]+"'>+</span>"
        //     document.getElementById("ordersCount").innerText = Number(document.getElementById("ordersCount").innerText)+1;
        //     var orderItemsObj = {
        //       orderedName : document.getElementById("foodName_"+event.target.id.split("_")[1]).innerText,
        //       orderedPrice : document.getElementById("foodPrice_"+event.target.id.split("_")[1]).innerText,
        //       orderedImg  : document.getElementById("foodImg_"+event.target.id.split("_")[1]).getAttribute("src"),
        //       orderedQuantity : document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText,
        //     }
        //   }
          
        // }
        if(event.target.className == "cartedItems" || event.target.className=="orderFoodBtn"){
          if(event.target.innerText == '-'){
            if(document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText == '1'){
              document.getElementById("orderItem_"+event.target.id.split("_")[1]).innerText = "Add To Cart";
              document.getElementById("ordersCount").innerText = '0';
              copy? copy -= Number(document.getElementById("foodPrice_"+event.target.id.split("_")[1]).innerText.split("$")[1]):0
            }else{
              document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText = Number(document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText) - 1;
              document.getElementById("ordersCount").innerText = Number(document.getElementById("ordersCount").innerText) - 1;
              // index = orderItemsList.indexOf()
              // orderItemsList.splice(index,1)
              copy? copy -= Number(document.getElementById("foodPrice_"+event.target.id.split("_")[1]).innerText.split("$")[1]):0
            }
          }else if(event.target.innerText == '+' || event.target.innerText == "Add To Cart"){
            copy += Number(document.getElementById("foodPrice_"+event.target.id.split("_")[1]).innerText.split("$")[1])
            document.getElementById("ordersCount").innerText = Number(document.getElementById("ordersCount").innerText)+1;
            if(document.getElementById("orderItem_"+event.target.id.split("_")[1]).innerText == "Add To Cart"){
              document.getElementById("orderItem_"+event.target.id.split("_")[1]).innerHTML= "<span class='cartedItems' id='removeCartItem_"+event.target.id.split("_")[1]+"'>-</span>&nbsp&nbsp&nbsp&nbsp&nbsp<span class='addedCartItemCount' id='addedItems_"+event.target.id.split("_")[1]+"'>1</span>&nbsp&nbsp&nbsp&nbsp&nbsp<span class='cartedItems' id='addCartItem_"+event.target.id.split("_")[1]+"'>+</span>"
            }else{
              document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText = Number(document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText) + 1;
              //document.getElementById("ordersCount").innerText = Number(document.getElementById("ordersCount").innerText) + 1;
            }
          }
          var orderItemsObj = {
            orderedID : "orderId_"+event.target.id.split("_")[1],
            orderedName : document.getElementById("foodName_"+event.target.id.split("_")[1]).innerText,
            orderedPrice : document.getElementById("foodPrice_"+event.target.id.split("_")[1]).innerText,
            orderedImg  : document.getElementById("foodImg_"+event.target.id.split("_")[1]).getAttribute("src"),
            orderedQuantity :document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText
          }
          console.log(orderItemsObj);
          // if(orderItemsListObj.indexOf(orderItemsObj) == -1){
          //   orderItemsObj["orderedQuantity"] = 
          // }
          let found = 0,index=0;
          orderItemsListObj.length?0:orderItemsListObj.push(orderItemsObj)
          if(orderItemsListObj.length){
            for(var i=0;i<orderItemsListObj.length;i++){
              if(orderItemsListObj[i]["orderedID"] == "orderId_"+event.target.id.split("_")[1]){
                found = 1;
                index = i;
              }
            }
            if(found ==1){
              orderItemsListObj[index]["orderedQuantity"] = document.getElementById("addedItems_"+event.target.id.split("_")[1]).innerText;
            }else{
              orderItemsListObj.push(orderItemsObj)
            }
          }
          console.log(copy);
          
          document.getElementById("totalAmtTextContent").innerText = "$"+copy.toFixed(2);
        }
      });

      document.getElementsByClassName("checkoutFooter")[0].addEventListener("click",function(eve){
        if(eve.target.id == "cartBtn"){
          var totalAmountText = 0;
          document.getElementById("totalAmtTextContent").innerText = 0
          if(document.getElementsByClassName("ordercartList").length){
            document.getElementsByClassName("ordercartList")[0].innerHTML="";
            totalAmountText = 0;
          }
          let cartList = "";
          let orderedItem = ""
          //cartList.setAttribute("class","cartListItem");
          orderItemsListObj.forEach(function(item,i){
            cartList = document.createElement("div");
            document.getElementsByClassName("checkoutFooter")[0].style.height = "70%";
            document.getElementsByClassName("ordercartList")[0].style.height = "70%";
            document.getElementsByClassName("ordercartList")[0].style.padding = "20px";
            document.getElementsByClassName("ordercartList")[0].appendChild(cartList);
            cartList.classList.add("cartListItem");
            orderedItem = document.createElement("div");
            orderedItem.classList = "orderItemList";
            //orderedItem.setAttribute("style","overflowY: scroll");
            let imgItem = document.createElement("img");
            imgItem.setAttribute("src",item.orderedImg);
            imgItem.setAttribute("height","150");
            imgItem.setAttribute("width","200");
            orderedItem.appendChild(imgItem);
            let namePrice = document.createElement('div');
            let nameItem = document.createElement("span");
            let price = document.createElement("span");
            let nameText = document.createElement("span");
            let nameTextContent = document.createTextNode("Name : ");
            nameText.appendChild(nameTextContent);
            let costText = document.createElement("span");
            let costTextContent = document.createTextNode("Price : ");
            costText.appendChild(costTextContent);
            let quantText = document.createElement("span");
            let quantTextContent = document.createTextNode("Quantity : ");
            quantText.appendChild(quantTextContent);
            let nameItemText = document.createTextNode(item.orderedName);
            let priceText = document.createTextNode(item.orderedPrice);
            let quantItem = document.createElement("span");
            quantItem.appendChild(quantText)
            quantItem.appendChild(document.createTextNode(item.orderedQuantity));
            nameItem.appendChild(nameText)
            nameItem.appendChild(nameItemText);
            price.appendChild(costText);
            price.appendChild(priceText);
            namePrice.appendChild(nameItem);
            namePrice.append(document.createElement("br"))
            namePrice.append(document.createElement("br"))
            namePrice.appendChild(price);
            namePrice.append(document.createElement("br"));
            namePrice.append(document.createElement("br"));
            namePrice.append(quantItem);
            orderedItem.appendChild(namePrice);
            cartList.appendChild(orderedItem);
            let orderPriceCont = document.createElement("div");
            orderPriceCont.setAttribute("class","amount")
            let orderPriceAmountText = document.createElement("p");
            let x =  Number(item.orderedPrice.split("$")[1])
            orderPriceAmountText.appendChild(document.createTextNode("Amount : $"+Number(item.orderedQuantity)*(x.toFixed(2))));
            orderPriceCont.appendChild(orderPriceAmountText);
            cartList.appendChild(orderPriceCont);
            document.getElementById("closeCart").style.display = "inline-block";
            document.getElementById("cartHeader").classList.remove("cartHeaderClose");
            document.getElementById("cartHeader").classList.add("cartHeaderOpen");
            //document.getElementById("cartHeader").classList.toggle("cartHeaderOpen");
            document.getElementsByClassName("ordercartList")[0].style.marginTop = "50px"
            document.getElementById("cartBtn").innerText = "Confirm Order";
            var totalAmount = document.getElementsByClassName("amount")[i].innerText;
            
            totalAmountText += Number(totalAmount.split("$")[1].toFixed(2));
            
            document.getElementById("totalAmtTextContent").innerText = "$"+totalAmountText.toFixed(2);
          });
          //orderedItem.setAttribute("class","orederItemInCartList");
        }
        if(eve.target.id == "closeCart"){
          document.getElementById("cartHeader").classList.add("cartHeaderClose");
          document.getElementById("cartHeader").classList.remove("cartHeaderOpen");
          document.getElementsByClassName("ordercartList")[0].innerHTML = "";
          document.getElementsByClassName("checkoutFooter")[0].style.height = "fit-content";
          document.getElementsByClassName("ordercartList")[0].style.height = "0px";
          document.getElementsByClassName("ordercartList")[0].style.padding = "0px";
          document.getElementById("closeCart").style.display = "none";
          document.getElementsByClassName("ordercartList")[0].style.marginTop = "0px";
          document.getElementById("cartBtn").innerText = "Takeme To Cart";
        }
      })
      
      // var foodItem = document.getElementsByClassName("foodItemsContainer")[0]
      // console.log(foodItem)
      // foodItem.addEventListener("mouseover",function(eve){
      //     //console.log(eve.target,this);
      //   if(eve.target.getAttribute("data-fooditem")?eve.target.getAttribute("data-fooditem").split("_")[0] == "foodItems":false ||eve.target.parentElement.className.split("_")[1]=="foodItems"){
      //     if(eve.target.getAttribute("data-fooditem")){
      //       idName = "orderItem_"+eve.target.getAttribute("data-fooditem").split("_")[1];
      //     }else if(eve.target.parentElement.className == "details_foodItems"){
      //       idName = "orderItem_"+eve.target.parentElement.parentElement.className.split("_")[0];
      //     }else{
      //       idName = "orderItem_"+eve.target.parentElement.className.split("_")[0];
      //     }
      //     // var idName = eve.target.id.split("_").length?eve.target.id:eve.target.parentElement.parentElement.id
      //     itemOrder = document.getElementById(idName)
      //     //console.log(itemOrder)
      //     if(itemOrder.style.display == "none"){
      //       itemOrder.style.display ="block"
      //     }
      //   }
      // })
      // foodItem.addEventListener("mouseleave",function(eve){
      //   if(itemOrder.style.display == "block"){
      //     itemOrder.style.display ="none"
      //   }
      // },true)
    }
  }
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json", true);
  xhttp.send();

  

