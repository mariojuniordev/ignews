interface Content {
  type: string;
  text: string;
}

export interface Result {
  id: string;
  uid: string;
  url: string | null;
  type: string;
  href: string;
  tags: any[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: {
    title: string;
    content: Content[];
  };
}
