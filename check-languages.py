import json
import os
import re


def is_valid_file(filename):
    return re.search("(.*).json$", filename)


def separate_keys_with_language(files):
    my_dict = {}

    for filename in files:
        with open(f"translations/{filename}") as json_file:
            data = json.load(json_file)
            language = filename.replace(".json", "")

            for key in data:
                if not key in my_dict:
                    my_dict[key] = {
                        language: data[key]
                    }
                else:
                    my_dict[key][language] = data[key]
    return my_dict


def insert_missing_language(data, languages):
    for key in data:
        for language in languages:
            language = language.replace(".json", "")
            if not language in data[key]:
                data[key][language] = ""
    return data


def save_json(data):
    with open("language.json", "w") as output_file:
        output_file.write(data)


language_files = [f for f in os.listdir(
    'translations') if is_valid_file(f)]

file = separate_keys_with_language(language_files)
file = insert_missing_language(file, language_files)
final_json = json.dumps(file, sort_keys=True, indent=2)
save_json(final_json)
