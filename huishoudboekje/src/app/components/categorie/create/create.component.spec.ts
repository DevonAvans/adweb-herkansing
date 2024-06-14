import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let mockCategorieService: any;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockCategorieService = jasmine.createSpyObj(['create']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('123'),
        },
      },
    };
    component = new CreateComponent(mockCategorieService, mockActivatedRoute);
  });

  it('should have a defined createCategorie method', () => {
    expect(component.createCategorie).toBeDefined();
  });

  it('should call create method of CategorieService when createCategorie is called', () => {
    component.createCategorie();
    expect(mockCategorieService.create).toHaveBeenCalled();
  });
});