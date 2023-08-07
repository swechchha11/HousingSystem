import React , {useState} from 'react';
const Form=()=>{

    const [row, getrow] = useState();
    const [col, getcol]=useState();
    const [infra,getinfra]=useState('House');
    const [plotnumber,getplotnumber]=useState('');

    const [house, setHouses] = useState([]);
    const [gym, setGyms] = useState([]);
    const [restaurant, setRestaurents] = useState([]);
    const [hospital, setHospitals] = useState([]);
    

    //THis function will create a plot area of m*n dimensions
    const setplot = (m,n) => {    
        const gridContainer = document.getElementById("plot");
        gridContainer.style.gridTemplateRows = `repeat(${m}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
        for (let i = 1; i <= m*n; i++) {
          const cell = document.createElement("div");
          cell.classList.add("gridcell");
          cell.id = i;
          cell.style.padding = "10px";
          cell.innerHTML = i;
          gridContainer.appendChild(cell);
          cell.style.backgroundColor = "#e0e1dd";
        }};
        
   
    const changeinfra=(event)=>{
  getinfra(event.target.value);
    };

    const changeplotnumber=(event)=>{
  getplotnumber(event.target.value);
    };


    const changevalue=(event)=>{
  getrow(event.target.value);
    };
    const changevalue2=(event)=>{
getcol(event.target.value);
 };



const clickbutton =(e)=>{
                if (!row || !col) {
                alert("enter row and column");
                getrow('');
                getcol('');
            
                } else {
                    e.preventDefault();
                 var  totals = row * col;
                  document.getElementById("row").value = "";
                  document.getElementById("column").value = "";
                  document.getElementById("plot").style.display = "grid";
                setplot(row, col);
                  document.getElementById("form").style.display = "none";
                  document.getElementById("form1").style.display = "block";
                }
            

}




const clickbutton2 =(e)=>{ 
    e.preventDefault();
    if(plotnumber> row*col)
    alert("This plot does not exist");
        else if (!plotnumber) {
          alert("Enter plot number");
        } else if (house.includes(plotnumber)) alert("this is already a house");
        else {
          if (infra === "Gym" && !gym.includes(plotnumber)) {
            setGyms(gym => [...gym,plotnumber]);
            var hh = document.createElement("div");
            hh.innerText = "G";
            hh.style.textAlign = "center";
            hh.style.display = "grid";
            document.getElementById(plotnumber).appendChild(hh);
          } else if (infra === "House") {
            if (
              gym.includes(plotnumber) ||
              restaurant.includes(plotnumber) ||
              hospital.includes(plotnumber)
            )
              alert("plot cant be assigned as house");
            else {
                setHouses(house => [...house,plotnumber]);
              var hh2 = document.createElement("div");
              hh2.innerText = "HOUSE";
              hh2.style.textAlign = "center";
              document.getElementById(plotnumber).appendChild(hh2);
            }
          } else if (infra === "Restaurant" && !restaurant.includes(plotnumber)) {
            setRestaurents(restaurent => [...restaurent,plotnumber]);
            var gg = document.createElement("div");
            gg.innerText = "R";
            gg.style.color = "#24272c";
            gg.style.display = "grid";
            gg.style.textAlign = "center";
            document.getElementById(plotnumber).appendChild(gg);
          } else if (infra === "Hospital" && !hospital.includes(plotnumber)) {

           setHospitals(hospital => [...hospital,plotnumber]);
            var hh1 = document.createElement("div");
            hh1.innerText = "H";
            hh1.style.textAlign = "center";
            hh1.style.display = "grid";
            document.getElementById(plotnumber).appendChild(hh1);
          }
        }
}


const getbhouse=(e)=>{
    var gethouse = document.getElementById("gethouse");
  e.preventDefault();
  document.getElementById("row1").value = "";
  if (house.length === 0) alert("There are no House");
  else {
    getbesthouse();
  }
}

var totalcolumns=col;
//gives nearest gym to a input house
const getnearestgym = (housex, housey) => {
    var mindisgym = 1000000000;
    var temp = {
      index: -1,
      dis: 1000000000
    };
    totalcolumns=col;
    for (let i = 0; i < gym.length; i++) {
      var gymx = Math.floor((gym[i] - 1) / col);
      var gymy = Math.floor((gym[i] - 1) % col);
  
      var dis = Math.abs(gymx - housex) + Math.abs(gymy - housey);
      if (dis < mindisgym) {
        mindisgym = Math.min(mindisgym, dis);
        temp.index = gym[i];
        temp.dis = mindisgym;
      }
    }
    return temp;
  };
  
  //gives nearest hospital to a input house
  const getnearesthospital = (housex, housey) => {
    var mindishospital = 1000000000;
    var temp = {
      index: -1,
      dis: 1000000000
    };
    for (let i = 0; i < hospital.length; i++) {
      var hospitalx = Math.floor((hospital[i] - 1) / col);
      var hospitaly = Math.floor((hospital[i] - 1) % col);
      var dis = Math.abs(hospitalx - housex) + Math.abs(hospitaly - housey);
      if (dis < mindishospital) {
        mindishospital = Math.min(mindishospital, dis);
        temp.index = hospital[i];
        temp.dis = mindishospital;
      }
    }
    return temp;
  };
  
  //gives nearest restaurant to the input house
  const getnearestrestaurant = (housex, housey) => {
    var mindisrestaurant = 1000000000;
    var temp = {
      index: -1,
      dis: 1000000000
    };
  
    for (let i = 0; i < restaurant.length; i++) {
      var restaurantx = Math.floor((restaurant[i] - 1) / col);
      var restauranty = Math.floor((restaurant[i] - 1) % col);
      var dis = Math.abs(restaurantx - housex) + Math.abs(restauranty - housey);
      if (dis < mindisrestaurant) {
        temp.index = restaurant[i];
  
        mindisrestaurant = Math.min(mindisrestaurant, dis);
        temp.dis = mindisrestaurant;
        temp.index = restaurant[i];
      }
    }
    return temp;
  };



const getbesthouse = () => {
    document.getElementById("form1").style.display = "none";
    if (house.length === 0) {
      alert("there are no house in plot");
    } else {
      var score = [];
      score.length = house.length;
      for (let i = 0; i < house.length; i++) {
        var housex = Math.floor((house[i] - 1) / col);
        var housey = Math.floor((house[i] - 1) % col);
        var temp = 10000000000;
        var ng = getnearestgym(housex, housey);
        var nh = getnearesthospital(housex, housey);
        var nr = getnearestrestaurant(housex, housey);
        var nhi = nh.index;
        var nhd = nh.dis;
        var ngi = ng.index;
        var ngd = ng.dis;
        var nri = nr.index;
        var nrd = nr.dis;
  
        if (
          gym.includes(ngi) &&
          hospital.includes(ngi) &&
          restaurant.includes(ngi)
        )
          temp = Math.min(temp, ngd);
        if (
          gym.includes(nhi) &&
          hospital.includes(nhi) &&
          restaurant.includes(nhi)
        )
          temp = Math.min(temp, nhd);
        if (
          gym.includes(nri) &&
          hospital.includes(nri) &&
          restaurant.includes(nri)
        )
          temp = Math.min(temp, nrd);
        if (gym.includes(ngi) && hospital.includes(ngi)) {
          temp = Math.min(temp, ngd + nrd);
        }
        if (gym.includes(ngi) && restaurant.includes(ngi)) {
          temp = Math.min(temp, ngd + nhd);
        }
        if (hospital.includes(nhi) && gym.includes(nhi)) {
          temp = Math.min(temp, nrd + nhd);
        } else if (hospital.includes(nhi) && restaurant.includes(nhi)) {
          temp = Math.min(temp, ngd + nhd);
        }
        if (restaurant.includes(nri) && gym.includes(nri)) {
          temp = Math.min(temp, ngd + nhd);
        } else if (restaurant.includes(nri) && hospital.includes(nri)) {
          temp = Math.min(temp, ngd + nrd);
        }
  
        temp = Math.min(temp, nhd + ngd + nrd);
        score[i] = temp;
      }
      var bscore = 1000000000000,
        bhouse = -1;
      for (var j = 0; j < score.length; j++) {
        if (score[j] < bscore) {
          bscore = score[j];
          bhouse = house[j];
        }
      }
      document.getElementById(bhouse).style.backgroundColor = "red";
      document.querySelector(".result").display = "block";
      document.querySelector(".result").innerHTML = "BEST HOUSE IS " + bhouse;
  
      return bhouse;
    }
  };
  






    return(
        <>


    
<h1 className="heading">HOUSE RECOMMENDATION SYSTEM</h1>
<div className="main">
<div className="div-questions">
<i className="fa fa-home" aria-hidden="true"></i>
<h1 className="result" display="none"></h1>
<form id="form" onSubmit={clickbutton}>    
<div className="question">Choose the dimensions of plot</div>
<div className="row">Choose number of rows</div>
<input className="input"  type="number" name="row" id="row" placeholder="enter number of rows" onChange={changevalue}/>
<div className="column">Choose number of column</div>
<input className="input" type="number" name="column" id="column" placeholder="enter number of columns" onChange={changevalue2}/>
<input className="submit" id="submit" type="submit" value="submit" />

</form>



{/* <!-- form2 --> */}
<form id="form1" >
<div className="question1"></div>
<div className="row1">Enter Plot Number</div>
<input className="input1"  type="number" name="row" id="row1" placeholder="Enter plot number" onChange={changeplotnumber}/>
<div className="column1">What do you want here</div>
<select id="column1" className="input1" name="building" display="block" onChange={ changeinfra }>
 <option value="House">House</option>
<option value="Gym">Gym</option>
<option value="Hospital">Hospital</option>
<option value="Restaurant">Restaurant</option>
</select>
<input className="submit1" id="submit1" type="submit" value="submit" onClick={clickbutton2}/>
<input className="gethouse" id="gethouse" type="submit" value="get best house" onClick={getbhouse}/>
<div className="xx1"></div>
</form>
</div>
<div className="plot" id="plot"></div>   
</div>

        </>
    );
}
export default Form;