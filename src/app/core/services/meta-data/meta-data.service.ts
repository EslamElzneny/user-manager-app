import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export let keywords_arr:string[] = [
  "user manager app"
]


@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  hostUrl: string = environment.hostUrl;
  titleTranslate = 'User Manager App';

  constructor(
    private title: Title,
    private metaService: Meta,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  updateMetaData(title: string, description: string, image: string = '',keywords='', ogType = 'website', twitterType = 'summary') {
      if (!image) {
        image = `${this.hostUrl}/${this.locale}/assets/images/logo.webp`;
      }
      let currentLocale = this.locale == 'ar' ? 'ar_sa':'en_us';
      this.metaService.updateTag({ property: 'title', content: title });
      this.metaService.updateTag({ property: 'image', content: image });
      this.metaService.updateTag({ property: 'keywords', content: keywords ? keywords : keywords_arr.join(", ") });
      this.metaService.updateTag({ property: 'description', content: description });
      // OG system
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:url', content: `${this.hostUrl}${this.router.url}` });
      this.metaService.updateTag({ property: 'og:type', content: ogType });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ property: 'og:keywords', content: keywords });
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ property: 'og:locale', content: currentLocale });
      this.metaService.updateTag({ property: 'og:locale:alternate', content: currentLocale });

      // twitter system
      this.metaService.updateTag({ name: 'twitter:card', content: twitterType });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
      this.metaService.updateTag({ name: 'twitter:keywords', content: keywords });
      this.metaService.updateTag({ name: 'twitter:url', content: `${this.hostUrl}${this.router.url}` });
      this.metaService.updateTag({ name: 'twitter:image', content: image });
      this.metaService.updateTag({ name: 'twitter:locale', content: currentLocale });

  }

  removeMetaData() {

    this.metaService.removeTag('property="og:title"');
    this.metaService.removeTag('property="og:url"');
    this.metaService.removeTag('property="og:type"');
    this.metaService.removeTag('property="og:description"');
    this.metaService.removeTag('property="og:image"');

    // twitter system
    this.metaService.removeTag('name="twitter:card"');
    this.metaService.removeTag('name="twitter:title"');
    this.metaService.removeTag('name="twitter:description"');
    this.metaService.removeTag('name="twitter:url"');
    this.metaService.removeTag('name="twitter:image"');
  }

  updatePageTitle(title = 'Be Healthy') {
    this.title.setTitle(title);
  }

}
