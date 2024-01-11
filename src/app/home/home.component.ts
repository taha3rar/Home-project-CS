import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import {
  Tree,
  TreeModule,
  TreeNodeDropEvent,
  TreeNodeSelectEvent,
} from 'primeng/tree';
import { ResizeDirective } from '../shared/directives/resize.directive';
import { DropdownModule } from 'primeng/dropdown';
import { ConnectionPipe } from '../shared/pipes/connection.pipe';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs';
import { treeData } from '../shared/data';
import { DataService } from '../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    TreeModule,
    DropdownModule,
    NgFor,
    NgIf,
    NgClass,
    ResizeDirective,
    TreeModule,
    ConnectionPipe,
    TitleCasePipe,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [TreeDragDropService, DataService],
  standalone: true,
})
export class HomeComponent implements OnInit, AfterViewInit {
  treeComponent!: HTMLDivElement;
  @ViewChild(Tree, { static: true }) pTree!: Tree;
  @ViewChild('searchbar') searchbar: any;
  @ViewChild('treeWrapper') treeWrapper: any;
  searchControl = new FormControl<string>('');
  selectedNodes: any = [];
  options = [
    {
      label: 'Zones',
      value: 'Zones',
    },
    {
      label: 'Sites',
      value: 'Sites',
    },
    {
      label: 'Placemark',
      value: 'Placemark',
    },
    {
      label: 'Layers',
      value: 'Layers',
    },
  ];
  dropdownValue: string = this.options[0].value;

  tree = treeData;

  treeCopy: TreeNode[] = [...this.tree];
  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.initFilter();
  }

  getData() {
    this.dataService.getTreeData().subscribe((data) => {
      this.tree = data;
      this.treeCopy = [...this.tree];
    });
  }

  initFilter() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        map((value) => {
          this.filter(value!);
        }),
        tap(() => {
          this.resizeWrapper();
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.treeComponent = document.querySelector('.p-tree') as HTMLDivElement;
    this.resizeWrapper();
  }

  filter(val: string) {
    if (!val) {
      this.pTree.value = this.treeCopy.slice();
      this.pTree._filter('');
      return;
    }
    this.pTree.filterBy = 'label,data.name,data.connection';
    const i = this.tree.findIndex((node) => node.label === this.dropdownValue);
    if (i !== -1) {
      this.collapseAll(this.tree[i].key);
      this.tree[i].expanded = true;
      this.pTree.value = [this.treeCopy[i]];
    }
    this.pTree._filter(val);
  }

  toggleExpand(node: TreeNode, e: MouseEvent) {
    e.stopPropagation();
    node.expanded = !node.expanded;
    if (!node.children?.length || !node.key?.includes('parent')) {
      this.resizeWrapper();
      return;
    }

    this.collapseAll(node.key); // not sure if its allowed to have multiple ones open
    this.resizeWrapper();
  }

  collapseAll(excluedKey?: string) {
    this.tree.forEach((node) => {
      if (node.key !== excluedKey) node.expanded = false;
    });
  }

  nodeSelect(e: TreeNodeSelectEvent) {
    // if icon was clicked in the process then disable the event

    if (
      e.originalEvent.target instanceof HTMLSpanElement &&
      e.node.children?.length
    ) {
      e.originalEvent.stopImmediatePropagation();
    }
  }

  nodeDrop(e: TreeNodeDropEvent) {
    if (
      e.dropNode?.children?.length ||
      !(e.originalEvent?.target instanceof HTMLLIElement)
    ) {
      return;
    } else {
      e.accept?.();
    }
  }
  resizeWrapper() {
    // without this, the height of the tree is taken before the collapse/expand
    requestAnimationFrame(() => {
      this.treeWrapper.nativeElement.style.minHeight = `${
        this.treeComponent.offsetHeight +
        this.searchbar.nativeElement?.offsetHeight +
        48
      }px`;
    });
  }
}
