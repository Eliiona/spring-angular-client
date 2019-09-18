import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService} from '../service/item.service';
import { Item } from '../model/item';
import { Type } from '../type.enum';
import { $enum } from 'ts-enum-util';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent{

    item: Item;
    values = $enum(Type).getValues();
    types = Type;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {
    this.item  = new Item();
   }

    onSubmit() {
        this.itemService.save(this.item).subscribe(result => this.refreshPage());
    }

    refreshPage(){
        this.router.navigateByUrl('/refresh', {skipLocationChange:true}).then(()=>{
            this.router.navigateByUrl('/additem');
        });
    }

}
