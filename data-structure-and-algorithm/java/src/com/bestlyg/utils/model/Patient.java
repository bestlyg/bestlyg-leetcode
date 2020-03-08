package com.bestlyg.utils.model;

public class Patient implements Comparable<Patient> {
	private String name;
	private int boneBreak;

	public Patient(String name, int boneBreak) {
		this.name = name;
		this.boneBreak = boneBreak;
	}

	@Override
	public int compareTo(Patient patient) {
		return this.boneBreak - patient.boneBreak;
	}

	@Override
	public String toString() {
		return "Person [name=" + name + ", boneBreak=" + boneBreak + "]";
	}
}
