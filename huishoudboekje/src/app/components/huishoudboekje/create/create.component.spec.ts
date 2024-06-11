import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HuishoudboekjeCreateComponent } from "./create.component";

describe("CreateComponent", () => {
    let component: HuishoudboekjeCreateComponent;
    let fixture: ComponentFixture<HuishoudboekjeCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HuishoudboekjeCreateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HuishoudboekjeCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
