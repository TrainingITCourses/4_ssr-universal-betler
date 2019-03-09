import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Launch } from '../store/models/launch';
import { Status } from '../store/models/status';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})

@Injectable()
export class ResultListComponent implements OnInit {
  
  @Input() public launchesResult: Launch[];
  public statuses: Status[];
  private statusesUrl = 'assets/data/launchstatus.json';
  public missionTypes;
  private typesUrl = 'assets/data/missiontypes.json';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Lista de estados para la descripción
    // TODO -> cargarla en el combo desde esta lista
    this.http.get<Response>(this.statusesUrl).subscribe((res: Response) => {
      this.statuses = res['types'];
    });
    this.http.get<Response>(this.typesUrl).subscribe((res: Response) => {
      this.missionTypes = res['types'];
    });
  }

  getPADAgency(launch) {
    try {
      // TODO Using try-catch for flow handling
      return launch.location.pads[0].agencies[0].name;
    }
    catch(e) {
      // do nothing, really
      return "N/A";
    }
  }

  getRocketAgency(launch) {
    try {
      // TODO Using try-catch for flow handling
      return launch.rocket.agencies[0].name;
    }
    catch(e) {
      // do nothing, really
      return "N/A";
    }
  }

  getMissionAgency(launch) {
    try {
      // TODO Using try-catch for flow handling
      return launch.missions[0].agencies[0].name;
    }
    catch(e) {
      // do nothing, really
      return "N/A";
    }
  }

  getStatusDescription(id){
    var aux = this.statuses.filter((status) => status.id == id);
    if (aux.length == 1) {
      return aux[0].description;
    } else {
      return "N/A";
    }
  }

  getMissionTypeDescription(launch) {
    try {
      var aux = this.missionTypes.filter((type) => type.id == launch.missions[0].type);
      if (aux.length == 1) {
        return aux[0].name;
      } else {
        return "N/A";
      }
    } catch (e) {
      return "N/A";
    }
  }

  getMissionType(launch) {
    try {
      return launch.missions[0].type;
    } catch (e) {
      return "N/A";
    }
  }
}
