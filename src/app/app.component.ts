import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'

import {IframeComponent} from './iframe/iframe.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamicComponent';
  items = [
    {
      name : "infinity war trailor",
      url : "https://www.youtube.com/embed/6ZfuNTqbHE8"
    },
    {
      name : "endgame trailor",
      url : "https://www.youtube.com/embed/TcMBFSGVi1c"
    }
  ] 
  constructor(public componentFactoryResolver:ComponentFactoryResolver, public container:ViewContainerRef, public sanitizer:DomSanitizer){}

  load(url){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(IframeComponent);
    // componentFactory - Base class for a factory that can create a component dynamically.
    // componentFactoryResolver - A simple registry that maps Components to generated ComponentFactory classes that can be used to create instances of components.
    // resolveComponentFactory - Retrieves the factory object that creates a component of the given type.

    this.container.clear();
    // ViewContainerRef - Represents a container where one or more views can be attached to a component.

    const componentRef = this.container.createComponent(componentFactory);
    // componentRef - Represents a component created by a ComponentFactory. Provides access to the component instance and related objects, and provides the means of destroying the instance.

    url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    componentRef.instance.data = url;
  }

}
