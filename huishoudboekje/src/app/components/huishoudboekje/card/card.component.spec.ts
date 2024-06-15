import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HuishoudboekjeCardComponent } from "./card.component";

xdescribe("CardComponent", () => {
    let component: HuishoudboekjeCardComponent;
    let fixture: ComponentFixture<HuishoudboekjeCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HuishoudboekjeCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HuishoudboekjeCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
