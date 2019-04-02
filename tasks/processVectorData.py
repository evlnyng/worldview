#!/usr/bin/env python

from optparse import OptionParser
import os
import sys
import json
import shutil

prog = os.path.basename(__file__)
base_dir = os.path.join(os.path.dirname(__file__), "..")
version = "3.0.0"
help_description = """\
Converts vector data to JSON files
"""

parser = OptionParser(usage="Usage: %s <config_file> <vectordata_input_dir> <output_dir>" % prog,
                      version="%s version %s" % (prog, version),
                      epilog=help_description)

(options, args) = parser.parse_args()
if len(args) != 3:
    parser.error("Invalid number of arguments")

config_file = args[0]
vectordata_input_dir = args[1]
output_dir = args[2]

with open(config_file) as fp:
    config = json.load(fp)

def copy_file(file):
    input_file = os.path.join(root, file)
    if input_file.endswith('.json'):
        response_json = {}
        vectordata = []
        with open(input_file) as json_file:
            initial_data = json.load(json_file)
            for i in initial_data:
                vectordata.append({i: initial_data[i]})
            vector_layer_filename = file;
            vector_layer_id = vector_layer_filename.split(".", 1)[0]
            response_json["vectorData"] = {}
            response_json["vectorData"][vector_layer_id] = vectordata
        with open(input_file, 'w') as json_file:
            json.dump(response_json, json_file,indent=2)
        shutil.copy(input_file, output_dir)

# Main
file_count = 0
error_count = 0

for root, dirs, files in os.walk(vectordata_input_dir):
    for file in files:
        try:
            file_count += 1
            copy_file(file)
        except Exception as e:
            sys.stderr.write("%s: ERROR: [%s] %s\n" % (prog, file, str(e)))
            error_count += 1

print "%s: %d error(s), %d file(s)" % (prog, error_count, file_count)

if error_count > 0:
    sys.exit(1)