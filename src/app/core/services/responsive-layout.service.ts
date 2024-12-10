import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveLayoutService {
  isXSmallScreen = this.register([Breakpoints.XSmall]);
  isSmallScreen = this.register([Breakpoints.Small]);
  isMediumScreen = this.register([Breakpoints.Medium]);
  isLargeScreen = this.register([Breakpoints.Large]);
  isXLargeScreen = this.register([Breakpoints.XLarge]);

  isSmallOrSmallerSync =
    this.breakpointObserver.isMatched(Breakpoints.XSmall) ||
    this.breakpointObserver.isMatched(Breakpoints.Small);

  isSmallOrSmaller = this.register([Breakpoints.XSmall, Breakpoints.Small]);

  isLargeOrBigger = this.register([
    Breakpoints.Large,
    Breakpoints.XLarge,
    Breakpoints.Medium,
  ]);

  columnCount = combineLatest([
    this.isXSmallScreen,
    this.isSmallScreen,
    this.isMediumScreen,
    this.isLargeScreen,
  ]).pipe(
    map(([isXSmall, isSmall, isMedium, isLarge]) => {
      return isXSmall ? 12 : isSmall ? 6  : isMedium ? 6 : isLarge ? 6 : 3;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  private register(breakpoints: string[]) {
    return this.breakpointObserver.observe(breakpoints).pipe(
      map((result) => result.matches),
      startWith(this.breakpointObserver.isMatched(breakpoints))
    );
  }
}
