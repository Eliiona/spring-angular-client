import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

    items: Item[];
    itemCount = 0;
    itemsLeft = 0;
    interval = null;
  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.refreshItems(false);

    this.interval = setInterval(() => {
        this.refreshItems(true);
    }, 2000);
  }

  deleteItem(item){
    this.itemService.delete(item).subscribe(result => this.refreshItems(true));
  }

  updateItem(item){
    this.itemService.crossOut(item).subscribe(result => this.refreshItems(true));

  }
      clearList(){
        this.itemService.deleteAll().subscribe(result => this.refreshPage());
      }
    refreshItems(refresh: boolean){
            this.itemService.findAll(refresh).subscribe(data => {
                if (data&&data.length>0){
                    this.items = data;
                }
                this.itemCount = this.items.length;
                this.itemsLeft = this.items.filter(item=>item.bought === false).length;
            });
    }

        refreshPage(){
            this.router.navigateByUrl('/refresh', {skipLocationChange:true}).then(()=>{
                this.router.navigateByUrl('/items');
            });
        }
}
