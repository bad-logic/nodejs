{
    "targets": [
        {
            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ],
            "target_name": "nan_addon",
            "sources": [
                "addon.cpp",
                "sync.cpp",
                "async.cpp"
            ],
        }
    ]
}
