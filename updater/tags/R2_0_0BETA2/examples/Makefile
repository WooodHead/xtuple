all:    allknownelemspkg.gz	\
        allknownwarnings.gz	\
        badcontentsxml.gz	\
        dependency1.gz		\
        dependency2.gz		\
        empty.gz		\
        missingfile.gz		\
        multiplecontents.gz	\
        nocontents.gz		\
        unknownelem.gz		\
        unsupportedprereq.gz

clean:
	rm -f *.gz

allknownelemspkg.gz:  allknownelemspkg			\
	              allknownelemspkg/dropifexists.sql	\
                      allknownelemspkg/initUpgrade	\
                      allknownelemspkg/package.xml	\
                      allknownelemspkg/packageschema.sql	\
                      allknownelemspkg/pkgtest.sql	\
                      allknownelemspkg/pkgtesttrigger.sql	\
                      allknownelemspkg/pkgtesttriggerfunction.sql	\
                      allknownelemspkg/pkgtestview.sql	\
                      allknownelemspkg/telephone.jpeg	\
                      allknownelemspkg/telephone.png	\
                      allknownelemspkg/telephone_ascii.jpg	\
                      allknownelemspkg/telephonelookup.mql	\
                      allknownelemspkg/telephonelookup.script	\
                      allknownelemspkg/telephonelookup.ui	\
                      allknownelemspkg/telephonelookup.xml
	tar czf $@ $<

allknownwarnings.gz:  allknownwarnings			\
                      allknownwarnings/contents.xml	\
                      allknownwarnings/initUpgrade	\
                      allknownwarnings/telephone.jpeg	\
                      allknownwarnings/telephone.png	\
                      allknownwarnings/telephone_ascii.jpg	\
                      allknownwarnings/telephonelookup.script	\
                      allknownwarnings/telephonelookup.ui	\
                      allknownwarnings/telephonelookup.xml
	tar czf $@ $<

badcontentsxml.gz: badcontentsxml	\
                   badcontentsxml/contents.xml
	tar czf $@ $<

dependency1.gz: dependency1			\
                dependency1/contents.xml	\
                dependency1/telephone.jpeg
	tar czf $@ $<

dependency2.gz: dependency2			\
                dependency2/contents.xml	\
                dependency2/telephone.png
	tar czf $@ $<

empty.gz:
	touch empty.gz

missingfile.gz: missingfile			\
                missingfile/contents.xml
	tar czf $@ $<

multiplecontents.gz:  multiplecontents	\
                      multiplecontents/a_contents.xml	\
                      multiplecontents/b_contents.xml
	tar czf $@ $<

nocontents.gz: nocontents nocontents/a
	tar czf $@ $<

unknownelem.gz: unknownelem			\
                unknownelem/contents.xml	\
                unknownelem/initUpgrade		\
                unknownelem/setVersion.sql
	tar czf $@ $<

unsupportedprereq.gz: unsupportedprereq			\
                      unsupportedprereq/contents.xml
	tar czf $@ $<
