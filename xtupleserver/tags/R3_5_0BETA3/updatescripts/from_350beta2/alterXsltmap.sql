SELECT dropIfExists('CONSTRAINT', 'xsltmap_xsltmap_import_check', 'public');
ALTER TABLE xsltmap ADD CONSTRAINT xsltmap_xsltmap_importexport_check
    CHECK (xsltmap_import <> '' OR xsltmap_export <> '');
