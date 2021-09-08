#!/bin/bash

out=public

rsync api-spec.yaml "$out"
rsync -a --delete icons "$out/"
