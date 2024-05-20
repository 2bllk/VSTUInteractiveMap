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
import xml.etree.ElementTree as ET

# , layer, ignore_case
def main(svgfile):
    ET.register_namespace('', 'http://www.w3.org/2000/svg')
    
    with open(svgfile) as fd:
        tree = ET.parse(fd)

    root = tree.getroot()

    # Iterate over all elements in the SVG file
    for elem in root.iter():
        # Check if the element has an inkscape:label attribute
        if '{http://www.inkscape.org/namespaces/inkscape}label' in elem.attrib:
            # Copy the inkscape:label attribute to the id attribute
            elem.set('id', elem.attrib['{http://www.inkscape.org/namespaces/inkscape}label'])

    # Save the modified SVG file
    tree.write('output.svg')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Return all object IDs of Inkscape layers.')
    parser.add_argument('svgfile', help='SVG file containing multiple layers')
    #parser.add_argument('-l', '--layer', help='only return object ID of given layer')
    #parser.add_argument('--ignore-case', action='store_true', help='case insensitive comparison for layer name')

    args = parser.parse_args()
    main(**vars(args))