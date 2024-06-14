import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DetailsComponent } from "@components/huishoudboekje/details/details.component";

xdescribe("DetailsComponent", () => {
    let component: DetailsComponent;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailsComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
