
export class CategoryDesc {
  title: string;
}

export class Category {
  id: string;
  descByLanguage: {[lang: string] : CategoryDesc};
}