function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.76, lng: -73.983 },
    zoom: 15,
    mapTypeId: "satellite",
  });
  map.setTilt(45);
}

var directionsService = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer();

// <---------------------------------------------------------------- calculation ------------------------------------------------------------>
function calCulate() {
  var start = 0,
    end = 0,
    cost = 0;
  var input1 = document.querySelector("#from").value;
  var input2 = document.querySelector("#to").value;
  var input3 = document.querySelector("#adult").value;
  var input4 = document.querySelector("#child").value;
  const src = ["Islampur", "Court", "RIT", "Borgaon", "Takari"];
  const des = [0, 3, 3, 5, 10];
  for (i = 0; i < src.length; i++) {
    if (input1 == src[i]) {
      start = i;
      break;
    }
  }
  for (i = 0; i < src.length; i++) {
    if (input2 == src[i]) {
      end = i;
      break;
    }
  }
  if (start < end) {
    for (i = start + 1; i <= end; i++) {
      cost = cost + des[i];
    }
  } else {
    for (i = end + 1; i <= start; i++) {
      cost = cost + des[i];
    }
  }

  var fair = 0;
  fair = cost * input3 + (cost * input4) / 2;

  payMent(fair);
}

// <---------------------------------------------------------------- calculation ------------------------------------------------------------>

function payMent(fair) {
  document.querySelector("#proceedPayment").innerHTML = "Pay Now";
  var options = {
    key: "rzp_test_yWIyqg88XZY49B", // Enter the Key ID generated from the Dashboard
    amount: fair * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Ticktley",
    description: "Save paper",
    image: "Images/playstore.png",

    handler: function (response) {
      alert("Success");
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      savetoDB(response);
      $("myModel").modal();
    },

    theme: {
      color: "#800080",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  document.getElementById("proceedPayment").onclick = function (e) {
    rzp1.open();
    e.preventDefault();
  };
}

// function savetoDB(response) {
//   console.log(response);
//   var payRef = firebase.database().ref("payment");

//   payRef.child("11111").set({
//     payment_id: response.razorpay_payment_id,
//   });
// }
