#!/bin/bash

cd ia
echo "Building the OCaml AI"
ocamlbuild test.native
cd ..
