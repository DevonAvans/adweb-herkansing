import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HuishoudboekjeOverviewComponent } from "./overview.component";

xdescribe("OverviewComponent", () => {
    let component: HuishoudboekjeOverviewComponent;
    let fixture: ComponentFixture<HuishoudboekjeOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HuishoudboekjeOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HuishoudboekjeOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
