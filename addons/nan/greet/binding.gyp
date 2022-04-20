{
    "targets": [{
        "include_dirs": [
            "<!(node -e \"require('nan')\")"
        ],
        "target_name": "greet",
        "sources": [
            "greet.cpp"
        ]
    }]
}
