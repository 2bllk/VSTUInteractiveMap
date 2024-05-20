"""
Inkscape Layer to Object-ID
===========================
Inkscape represents layers as SVG `g` elements annotated with metadata like layer name.
This script takes an SVG file and returns a JSON map of layer names to object IDs.
If you supply CLI option `-l`, you can retrieve the object ID of an individual layer.
Requires lxml. "sudo pip3 install lxml" or http://lxml.de/
CC-0, meisterluk, 2018
"""

import sys
import json
import argparse
import lxml.etree


def get_layers(dom):
    """Generator over all g elements constituting Inkscape layers"""
    found = set()
    for g in dom.xpath('//svg:g', namespaces={'svg':'http://www.w3.org/2000/svg'}):
        if g.attrib.get('{http://www.inkscape.org/namespaces/inkscape}groupmode') != 'layer':
            continue
        human_name = g.attrib.get('{http://www.inkscape.org/namespaces/inkscape}label')
        if not human_name:
            continue
        if human_name in found:
            print("Layer '{}' exists multiple times in Inkscape file, considering it only once".format(human_name), file=sys.stderr)
            continue
        found.add(human_name)
        yield g


def find_layer(layers, layer_name, case_sensitive=True):
    """Given a generator of layers, find layer with human-readable name `layer_name`
    and print it to stdout.
    """
    for g in layers:
        human_name = g.attrib.get('{http://www.inkscape.org/namespaces/inkscape}label')
        object_id = g.attrib.get('id')

        if human_name == layer_name:
            print(object_id)
            return
        if not case_sensitive and human_name.lower() == layer_name.lower():
            print(object_id)
            return

    print("Layer '{}' not found".format(layer_name))
    sys.exit(1)


def print_layers(layers):
    """Print a map of inkscape layers {name: object-id} in JSON to stdout"""

    output = {}
    for g in layers:
        human_name = g.attrib.get('{http://www.inkscape.org/namespaces/inkscape}label')
        object_id = g.attrib.get('id')

        output[human_name] = object_id

    print(json.dumps(output))
    sys.exit(0)


def main(svgfile, layer, ignore_case):
    with open(svgfile) as fd:
        dom = lxml.etree.parse(fd)

    layers = get_layers(dom)

    if layer:
        find_layer(layers, layer, case_sensitive=not ignore_case)
    else:
        print_layers(layers)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Return all object IDs of Inkscape layers.')
    parser.add_argument('svgfile', help='SVG file containing multiple layers')
    parser.add_argument('-l', '--layer', help='only return object ID of given layer')
    parser.add_argument('--ignore-case', action='store_true', help='case insensitive comparison for layer name')

    args = parser.parse_args()
    main(**vars(args))