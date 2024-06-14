import { TransactieCreateComponent } from "./create.component";

describe('TransactieCreateComponent', () => {
    let component: TransactieCreateComponent;
    let mockTransactieService: any;
    let mockCategorieService: any;
    let mockActivatedRoute: any;
  
    beforeEach(() => {
      mockTransactieService = jasmine.createSpyObj(['createTransactie']);
      mockCategorieService = jasmine.createSpyObj(['readByHuishoudboekjeId']);
      mockActivatedRoute = {
        snapshot: {
          paramMap: {
            get: jasmine.createSpy().and.returnValue('123'),
          },
        },
      };
      component = new TransactieCreateComponent(mockTransactieService, mockCategorieService, mockActivatedRoute);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should initialize form in constructor', () => {
      expect(component.form).toBeDefined();
      expect(component.form.get('dateTime')).toBeDefined();
      expect(component.form.get('amount')).toBeDefined();
      expect(component.form.get('selectedOptionType')).toBeDefined();
      expect(component.form.get('selectedOptionCategory')).toBeDefined();
    });
  
    it('should set _huishoudboekjeId in constructor', () => {
      expect(component['_huishoudboekjeId']).toEqual('123');
    });
  });