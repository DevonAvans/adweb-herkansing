import { TransactieCreateComponent } from "./create.component";

describe("TransactieCreateComponent", () => {
    let component: TransactieCreateComponent;
    let mockTransactieService: any;
    let mockCategorieService: any;
    let mockActivatedRoute: any;
    let mockLocation: any;

    beforeEach(() => {
        mockTransactieService = jasmine.createSpyObj(["createTransactie"]);
        mockCategorieService = jasmine.createSpyObj(["readByHuishoudboekjeId"]);
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: jasmine.createSpy().and.returnValue("123"),
                },
            },
        };
        mockLocation = jasmine.createSpyObj(["back"]);
        component = new TransactieCreateComponent(
            mockTransactieService,
            mockCategorieService,
            mockActivatedRoute,
            mockLocation
        );
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should set _huishoudboekjeId in constructor", () => {
        expect(component["_huishoudboekjeId"]).toEqual("123");
    });
});
