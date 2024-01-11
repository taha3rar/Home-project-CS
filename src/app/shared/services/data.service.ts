import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TreeNode } from 'primeng/api';

interface NodeDTO {
  isParent?: boolean;
  label: string;
  icon?: string;
  children?: NodeDTO[];
  data?: any;
  _id: string;
}

@Injectable()
export class DataService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getTreeData() {
    return this.httpClient
      .get<NodeDTO[]>(this.apiUrl + '/nodes')
      .pipe(map(this.normalizeTreeData));
  }
  getTreeDataMock() {}

  normalizeTreeData(nodes: NodeDTO[]): TreeNode[] {
    const normalizeNode = (node: NodeDTO): TreeNode => {
      console.log(node);
      const treeNode: TreeNode = {
        ...node,
        key: node.isParent ? `parent-${nodes.indexOf(node)}` : node._id,
        styleClass: node.isParent ? 'parent-tree-node' : '',
        selectable: !node.isParent,
        draggable: !node.children?.length,
        droppable: !node.children?.length,
        icon: `pi pi-fw pi-${node.icon}`,
      };

      if (node.children?.length) {
        treeNode.children = node.children.map((child) => normalizeNode(child));
      } else {
        delete treeNode.children; // Remove the children property if it's empty
      }

      return treeNode;
    };
    return nodes.map(normalizeNode);
  }
}
