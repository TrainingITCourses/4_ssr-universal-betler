import { Component, OnInit } from '@angular/core';
import { Launch } from './store/models/launch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from './store/models/status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  private launchesUrl = 'assets/data/launches.json';
  title = 'speed';
  private launches: Launch[];
  private statuses: Status[];
  public filteredLaunches: Launch[];

  constructor(private http: HttpClient) { }

  public onSearch(event) {

    var aux = this.launches;

    // Filter by estado
    if (event.estado != "-1") {
      aux = aux.filter((launch) => launch.status == event.estado);
    }

    // Filter by agencia
    if (event.agencia != "") {
      aux = aux.filter((launch) => {
        var coincidences = 0;
        if (launch.missions[0] && launch.missions[0].agencies && launch.missions[0].agencies[0]) {
          if (launch.missions[0].agencies[0].name.search(event.agencia) != -1){
            coincidences++;
          }
        }
        if (launch.rocket.agencies && launch.rocket.agencies[0]) {
          if (launch.rocket.agencies[0].name.search(event.agencia) != -1){
            coincidences++;
          }
        }
        if (launch.location && launch.location.pads[0] && launch.location.pads[0].agencies && launch.location.pads[0].agencies[0]) {
          if (launch.location.pads[0].agencies[0].name.search(event.agencia) != -1){
            coincidences++;
          }
        }

        return coincidences > 0;
      });
    }

    // Filter by tipo
    // TODO falla, hay algunas sin misión
    if (event.tipo != "-1") {
      console.log("Buscando tipo " + event.tipo);
      aux = aux.filter((launch) => {
        if (launch.missions[0]) {
          return launch.missions[0].type == event.tipo;
        } else {
          return false;
        }
      });
      console.log("Encontrados: " + aux.length);
    }

    this.filteredLaunches = aux;
  }

  ngOnInit(): void {
    // Cachea todos los lanzamientos
    this.http.get<Response>(this.launchesUrl).subscribe((res: Response) => {
      this.launches = res['launches'];
    });
  }

}
