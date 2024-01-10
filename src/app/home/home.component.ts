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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs';

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
  ],
  providers: [TreeDragDropService],
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
      value: 'zones',
    },
    {
      label: 'Sites',
      value: 'sites',
    },
    {
      label: 'Placemark',
      value: 'placemark',
    },
    {
      label: 'Layers',
      value: 'layers',
    },
  ];
  tree: TreeNode[] = [
    {
      label: 'Zones',
      key: 'parent-0',
      icon: 'pi pi-fw pi-map',
      styleClass: 'parent-tree-node',
      selectable: false,
      draggable: false,
      children: [
        {
          label: 'Zone 1',
          key: 'zone1',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-map',
          draggable: false,
          children: [
            {
              key: 'sensor-1',
              label: 'Sensor 1',
              icon: 'pi pi-fw pi-video',
              data: { name: 'camera 1' },
              draggable: true,
              droppable: true,
              selectable: true,
            },
            {
              key: 'sensor-2',
              label: 'Sensor 2',
              icon: 'pi pi-fw pi-camera',
              data: { connection: 3, name: 'camera 2' },
              draggable: true,
              droppable: true,
            },
            {
              key: 'sensor-3',
              label: 'Sensor 3',
              icon: 'pi pi-fw pi-video',
              data: { connection: 2, name: 'camera 3' },
              draggable: true,
              droppable: true,
              selectable: true,
            },
            {
              key: 'sensor-4',
              label: 'Sensor 4',
              icon: 'pi pi-fw pi-camera',
              data: { connection: 1, name: 'camera 4' },
              draggable: true,
              droppable: true,
            },
          ],
        },
        {
          key: '0-1',
          label: 'Zone 2',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-map',
          draggable: false,
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
              icon: 'pi pi-fw pi-file',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
    {
      key: 'parent-1',
      label: 'Events',
      data: 'Events Folder',
      icon: 'pi pi-fw pi-calendar',
      styleClass: 'parent-tree-node',
      selectable: false,
      draggable: false,
      children: [
        {
          key: '1-0',
          label: 'Meeting',
          icon: 'pi pi-fw pi-calendar-plus',
          data: 'Meeting',
        },
        {
          key: '1-1',
          label: 'Product Launch',
          icon: 'pi pi-fw pi-calendar-plus',
          data: 'Product Launch',
        },
        {
          key: '1-2',
          label: 'Report Review',
          icon: 'pi pi-fw pi-calendar-plus',
          data: 'Report Review',
        },
      ],
    },
    {
      key: 'parent-2',
      label: 'Placemark',
      data: 'Movies Folder',
      icon: 'pi pi-fw pi-star-fill',
      styleClass: 'parent-tree-node',
      selectable: false,
      draggable: false,
      children: [
        {
          key: '2-0',
          icon: 'pi pi-fw pi-star-fill',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            {
              key: '2-0-0',
              label: 'Scarface',
              icon: 'pi pi-fw pi-video',
              data: 'Scarface Movie',
            },
            {
              key: '2-0-1',
              label: 'Serpico',
              icon: 'pi pi-fw pi-video',
              data: 'Serpico Movie',
            },
          ],
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          icon: 'pi pi-fw pi-star-fill',
          data: 'De Niro Movies',
          children: [
            {
              key: '2-1-0',
              label: 'Goodfellas',
              icon: 'pi pi-fw pi-video',
              data: 'Goodfellas Movie',
            },
            {
              key: '2-1-1',
              label: 'Untouchables',
              icon: 'pi pi-fw pi-video',
              data: 'Untouchables Movie',
            },
          ],
        },
      ],
    },
    {
      key: 'parent-3',
      label: 'Layers',
      data: 'Movies Folder',
      icon: 'pi pi-fw pi-star-fill',
      styleClass: 'parent-tree-node',
      selectable: false,
      draggable: false,
      children: [
        {
          key: '3-0',
          icon: 'pi pi-fw pi-star-fill',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            {
              key: '3-0-0',
              label: 'Scarface',
              icon: 'pi pi-fw pi-video',
              data: 'Scarface Movie',
              droppable: false,
            },
            {
              key: '3-0-1',
              label: 'Serpico',
              icon: 'pi pi-fw pi-video',
              data: 'Serpico Movie',
              droppable: false,
            },
          ],
        },
        {
          key: '3-1',
          label: 'Robert De Niro',
          icon: 'pi pi-fw pi-star-fill',
          data: 'De Niro Movies',
          draggable: false,
          children: [
            {
              key: '3-1-0',
              label: 'Goodfellas',
              icon: 'pi pi-fw pi-video',
              data: 'Goodfellas Movie',
            },
            {
              key: '3-1-1',
              label: 'Untouchables',
              icon: 'pi pi-fw pi-video',
              data: 'Untouchables Movie',
            },
          ],
        },
      ],
    },
  ];
  constructor(private TreeDragDropService: TreeDragDropService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        map((value) => {
          console.log('Here');
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
    console.log(this.pTree);
  }

  filter(val: string) {
    this.pTree._filter(val);
  }

  toggleExpand(node: TreeNode, e: MouseEvent) {
    e.stopPropagation();
    node.expanded = !node.expanded;
    if (!node.children?.length || !node.key?.includes('parent')) {
      this.resizeWrapper();
      return;
    }

    this.collapseAll(node.key); // not sure if its allowed to have multiple ones open, if
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
