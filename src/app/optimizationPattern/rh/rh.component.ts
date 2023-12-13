import { Component, NgZone, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';
import { Observable, map } from 'rxjs';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
})
export class RhComponent implements OnInit {

  oddUsers: User[] = [];
  evenUsers: User[] = [];
  chart: any;
  constructor(private userService: UsersService,private ngZone: NgZone) {
    this.oddUsers = this.userService.getOddOrEven(true)
    this.evenUsers = this.userService.getOddOrEven(false);
  }
  ngOnInit() {
    this.oddUsers = this.userService.getOddOrEven(true)
    this.evenUsers = this.userService.getOddOrEven(false);
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    this.ngZone.runOutsideAngular(() => {
      this.chart = new Chart("MyChart",
          {
            type: 'bar',
            data: {
              labels: data.map(row => row.users),
              datasets: [
                {
                  label: 'Entreprise stats',
                  data: data.map(row => row.count)
                }
              ]
            }
          });
    });

  }
  getData() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    return data;
  }
  addUser(list: User[], newUser: string) {
    console.log("Hi")
    this.userService.addUser(list, newUser);
    this.oddUsers = [...this.userService.getOddOrEven(true)];
    this.evenUsers = [...this.userService.getOddOrEven(false)];
    const data = this.getData();
    this.ngZone.run(() => {
      this.chart.data.datasets[0].data = data.map(row => row.count);
      this.chart.update();
    });
  }
}
