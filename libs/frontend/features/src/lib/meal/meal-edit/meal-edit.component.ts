import { Component} from '@angular/core';
import { IMeal, MealSort } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'meal-edit-component',
    templateUrl: './meal-edit.component.html',
})

export class MealEditComponent {
    meal?: IMeal;

    constructor(
        // private MealService: MealService
    ) {}

    ngOnInit(): void {
        // this.meal = this.MealService.getMeal();

        // entiteit via de service ophalen en in lokaal object zetten.

        this.meal =
        {
            id: '0',
            title: '',
            description: '',
            isVega: false,
            cook: undefined,
            dateServed: new Date(),
            sort: MealSort.Breakfast
        };
    }

    onSubmit(meal: IMeal): void {
        // verzend meal-object naar de data-api backend.
        // Handel eventuele fouten af.

        console.log('onSubmit', meal);
    }
}