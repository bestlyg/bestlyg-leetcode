package com.bestlyg;

import com.bestlyg.tree.RBTree;
import com.bestlyg.tree.printer.BinaryTrees;

public class Main {

	public static void main(String[] args) {
		Main main = new Main();
		test4();
	}
	static void test3() {
		Integer data[] = new Integer[] {
				55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50
		};
		
		RBTree<Integer> rb = new RBTree<>();
		for (int i = 0; i < data.length; i++) {
			rb.add(data[i]);
			System.out.println("【" + data[i] + "】");
			BinaryTrees.println(rb);
			System.out.println("---------------------------------------");
		}
	}

	static void test4() {
		Integer data[] = new Integer[] {
				55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50
		};
		
		RBTree<Integer> rb = new RBTree<>();
		for (int i = 0; i < data.length; i++) {
			rb.add(data[i]);
		}

		BinaryTrees.println(rb);

		for (int i = 0; i < data.length; i++) {
			rb.remove(data[i]);
			System.out.println("---------------------------------------");
			System.out.println("【" + data[i] + "】");
			BinaryTrees.println(rb);
		}
	}
}
