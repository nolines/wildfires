import React from 'react';
import { render } from 'react-dom';
import Map from './Map';
import 'leaflet/dist/leaflet.css'
var URL = "https://ormanyanginlari.ogm.gov.tr/Home/GetOrmanYanginlari";

class App extends React.Component {
  state = {
    markersData: []
  };

  componentDidMount() {
    fetch(URL)
       .then((response) => response.json())
       .then((response) => {
         this.setState({ markersData: this.convertMarkerData(response.data) });
       });
  }

  convertMarkerData = (data) => {
    var arr = [];
    
    console.log("1" + data.length);
    data = data.filter(d=>d["YanginDurumu"]==="Devam Ediyor");
    console.log("2" + data.length);

    data.forEach(element => {
      arr.push({
        latLng: {
          lat: element["YKoordinati"],
          lng: element["XKoordinati"]
        },
        title: element["IsletmeSefligi"],
        region: element["BolgeMudurlugu"] + element["IlAdi"] + element["IlceAdi"] + element["Koyu"],
        risk:  element["RiskDurumu"]
      });
  })

  return arr;
  };

  addMarker = () => {
    const { markersData } = this.state;
    const lastMarker = markersData[markersData.length - 1];

    this.setState({
      markersData: [
        ...markersData,
        {
          title: +lastMarker.title + 1,
          latLng: {
            lat: lastMarker.latLng.lat + 0.0001,
            lng: lastMarker.latLng.lng + 0.0001,
          }
        }
      ]
    });
  };
  render() {
    const { markersData } = this.state;
    return (
      <div>
        <Map markersData={markersData} />
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
