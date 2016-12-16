#!/bin/bash

cd ia
echo "Building the OCaml AI"
ocamlbuild main.native
cd ..
