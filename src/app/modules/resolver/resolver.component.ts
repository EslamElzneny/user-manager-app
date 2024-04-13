import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.scss']
})
export class ResolverComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private title: Title,
    private metaService: Meta,
    private activeRoute:ActivatedRoute){

  }
  productsList:any[] = [];
  ngOnInit(): void {
    this.activeRoute.data.subscribe((data:any)=>{
      this.productsList = data['products'];
      this.testMetaData(this.productsList[0])
    })
    // this.http.get("https://fakestoreapi.com/products").subscribe((res:any)=>{
    //   this.productsList = res;
    // })
  }

  testMetaData(data:any){
    // OG system
    this.metaService.updateTag({ property: 'og:title', content: data?.title});
    this.metaService.updateTag({ property: 'title', content: data?.title});
    this.metaService.updateTag({ property: 'og:url', content: data?.image });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:description', content: data?.description });
    this.metaService.updateTag({ property: 'og:keywords', content: 'app app app' });
    this.metaService.updateTag({ property: 'og:image', content: data?.image });
    this.metaService.updateTag({ property: 'image', content: data?.image });
    this.metaService.updateTag({ property: 'og:locale', content: 'en' });
    this.metaService.updateTag({ property: 'og:locale:alternate', content: 'en' });
   //  return this.http.get('https://fakestoreapi.com/products').subscribe(res=>{

   //  });
  }

}
