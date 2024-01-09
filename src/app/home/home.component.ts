import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import {
  TreeModule,
  TreeNodeDropEvent,
  TreeNodeSelectEvent,
} from 'primeng/tree';
import { ResizeDirective } from '../shared/directives/resize.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [TreeModule, NgFor, NgIf, NgClass, ResizeDirective, TreeModule],
  providers: [TreeDragDropService],
  standalone: true,
})
export class HomeComponent implements OnInit {
  selectedNodes: any = [];

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
          data: 'Work Folder',
          icon: 'pi pi-fw pi-map',
          draggable: false,
          children: [
            {
              key: 'zone-1',
              label: 'Sensor 1',
              icon: 'pi pi-fw pi-video',
              data: 'Camera 1',
              draggable: true,
              droppable: true,
              selectable: true,
            },
            {
              key: '0-0-1',
              label: 'Sensor 2',
              icon: 'pi pi-fw pi-camera',
              data: { status: 'active', connection: '1' },
              draggable: true,
              droppable: true,
            },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
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
    console.log('home component init');
  }

  toggleExpand(node: TreeNode, e: MouseEvent) {
    e.stopPropagation();
    node.expanded = !node.expanded;
    if (!node.children?.length || !node.key?.includes('parent')) return;

    this.collapseAll(node.key); // not sure if its allowed to have multiple ones open, if
  }

  collapseAll(excluedKey?: string) {
    this.tree.forEach((node) => {
      if (node.key !== excluedKey) node.expanded = false;
    });
  }

  nodeSelect(e: TreeNodeSelectEvent) {
    console.log(e);
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
}
