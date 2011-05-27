<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                              xmlns:dia="http://www.lysator.liu.se/~alla/dia/">
  <xsl:output indent="yes" method="xml"/>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="dia:attribute[ 
                                     attribute::name='conn_endpoints' or
                                     attribute::name='connections' or
                                     attribute::name='elem_corner' or
                                     attribute::name='obj_bb' or
                                     attribute::name='obj_pos' or
                                     attribute::name='orth_points' or
                                     attribute::name='text_pos'
                                     ]">
    <xsl:variable name="name"
                  select="substring-before(substring-after(../dia:attribute[@name='name'], '#'), '#')"/>
    <xsl:variable name="schema"
                  select="substring-before(substring-after(../dia:attribute[@name='stereotype'], '#'), '#')"/>
    <xsl:variable name="attrtocopy" select="@name"/>
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:copy-of select="document('positions.xml')//object[@name=$name and @schema=$schema]/dia:attribute[@name=$attrtocopy]/node()"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
